import { rejects } from "assert";
import { resolve } from "path";
import React, { useState } from "react";

type FormValues = Record<string, any>;

type ValidationOptions<T> = {
  value: T;
  message: string;
};
type RefCallBack = (instance: any) => void;
type ChangeHandler = (event:  React.ChangeEvent<HTMLInputElement>) => Promise<void | boolean>;


type ValidationRules<Inputs> = Partial<
  Record<
    keyof Inputs,
    {
      required?: ValidationOptions<boolean>;
      pattern?: ValidationOptions<RegExp>;
      min?: ValidationOptions<number>;
      max?: ValidationOptions<number>;
      minLength?: ValidationOptions<number>;
      maxLength?: ValidationOptions<number>;
    }
  >
>;


type RegisterReturnType<T> = {
  onChange: ChangeHandler;
  onBlur: ChangeHandler;
  ref: RefCallBack;
  value: string;
  name: T; // make generic
  min?: string | number;
  max?: string | number;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  required?: boolean;
  disabled?: boolean;
  // rules?: ValidationRules<T>[keyof T];
}

type Errors<k> = Partial<Record<keyof k, { message: string }>>;

type UseFormProps<Inputs> = {
  defaultValues?: Inputs;
};

export const useMyForm = <Inputs extends FormValues>({
  defaultValues,
}: UseFormProps<Inputs> = {}) => {
  const [values, setValues] = useState<Inputs>(defaultValues || ({} as Inputs));
  const [errors, setErrors] = useState<Errors<Inputs>>({});

  const handleSubmit =
    (onSubmit: (values: Inputs) => void) =>
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      let valid = true;

      let newErrors: Errors<Inputs> = {};

      for (const name in values) {
        const value = values[name];
        const fieldRules = register(name).rules || {};
        const error = validateInputs(value, fieldRules);
        if (error) {
          valid = false;
          newErrors[name] = { message: error };
        }
      }
      //   onSubmit(values);

      if (valid) {
        onSubmit(values);
      } else {
        setErrors(newErrors);
      }
    };

  const watch = (name: keyof FormValues) => {
    return values[name];
  };

  const register = (
    name: keyof Inputs,
    rules?: ValidationRules<Inputs>[keyof Inputs]
  ):RegisterReturnType<keyof Inputs> => ({
    name,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setValues({ ...values, [name]: value });
      const error = validateInputs(value, rules);
      
      return new Promise((resolve,reject)=>{
        if (error) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error ? { message: error } : undefined,
          }));
          return resolve();
        } else {
          const { [name]: temp, ...rest } = errors;
          setErrors(rest as Errors<Inputs>);
          return reject();
        }
      });
    },
    value: values[name] || "",
    rules,
  });

  const validateInputs = (
    value: any,
    rules?: ValidationRules<Inputs>[keyof Inputs]
  ): string | null => {
    if (rules?.required?.value && !value) {
      return rules.required.message;
    }
    if (rules?.max?.value && value > rules.max.value) {
      return rules.max.message;
    }
    if (rules?.min?.value && value < rules.min.value) {
      return rules.min.message;
    }
    if (rules?.minLength?.value && value.length < rules.minLength.value) {
      return rules.minLength.message;
    }
    if (rules?.maxLength?.value && value.length > rules.maxLength.value) {
      return rules.maxLength.message;
    }
    if (rules?.pattern?.value && !rules.pattern.value.test(value)) {
      return rules.pattern.message;
    }
    return null;
  };

  const formState = { errors };

  return { register, handleSubmit, formState, watch };
};
