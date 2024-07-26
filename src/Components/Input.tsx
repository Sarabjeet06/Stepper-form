import React from "react";
import {
  UseFormRegister,
  FieldError,
  RegisterOptions,
  FieldArray,
  Path,
  FieldErrors,
  FieldValue,
  FieldValues,
} from "react-hook-form";
import { PersonalData } from "../types/InputTypes";
import { RegisterInputs, RegisterReturnType, RegisterType } from "../Context/useMyForm";

// Generic
// FormData is not used here, use Form
interface InputType<T extends FieldValues> {
  name: Path<T>;
  label: string;
  register: RegisterType<Path<T>>;
  error?: FieldError;
  type: React.HTMLInputTypeAttribute;

  // change rules types to specific
  rules?: {
    required: { value: boolean; message: string };
    pattern?: { value: RegExp; message: string };
  };
  // option:RegisterOptions
  // enableDefaultRule: ('email'|'phone'|'required')[]
  // isEmail?:boolean
  // isRequired?:boolean
}

// errorFunction

const Input = <T extends FieldValues>({
  name,
  label,
  error,
  register,
  rules,
  type,
}: InputType<T>) => {
  console.log(rules);
  if (error) {
    console.log("yes error");
  }
  return (
    <div className="label-input-container">
      <label>{label}</label>
      <div className="input-error-container">
        <input
          type="text"
          {...register({name,rules})}
        //   {...register(
        //     name
        //     //  {...rules,ruleMapper[type]}
        //     // ...(name === 'email' && {
        //     //     pattern: {
        //     //         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        //     //         message: "Invalid email address"
        //     //     }
        //     // }),
        //     // ...(name === 'phoneNumber' && {
        //     //     pattern: {
        //     //         value: /^\d{10}$/,
        //     //         message: "Invalid phone number"
        //     //     }
        //     // })
        //   )}
        />
        {error && <span>{error?.message}</span>}
      </div>
    </div>
  );
};

export default Input;

{
  /* 
const name = 'asd'
var address = 'UP'
let age = 21


// Interpret // Atg- reacd only
const getValue = <T extends object>(obj: T,key: keyof T)=>{

}

const user = {
    name:'asdasd',
    age:12
}



getValue(user,'')

getValue({a:'asd'},'a')

type User<T extends string|number>={
    name: string,
    email: string,
    age: T ,
}

const user1: User={
    name: 'ahja',
    email: 'ddd',
    age: '123',
}

const user2: User<number>={
    name: 'ahja',
    email: 'ddd',
    age: 123,
} */
}
