import { useContext, createContext, useState } from "react";
import { FormData } from "../types/InputTypes";
import { useMyForm } from "./useMyForm";

type ContextType = ReturnType<typeof useMyForm>;

export const FormContext = createContext<ContextType>(
  {
    register: () => ({ onChange: async () => false, onBlur: async () => false, ref: () => {}, value: "", name: "" }),
    handleSubmit: () => () => {},
    formState: { errors: {} },
    watch: () => "",
  }
);

interface PropsType {
  children?: React.ReactNode;
}

export const MyFormProvider: React.FC<PropsType> = (props) => {
  const { register, formState, handleSubmit, watch } = useMyForm();

  return (
    <FormContext.Provider value={{ register, formState, watch, handleSubmit }}>
      {props.children}
    </FormContext.Provider>
  );
};
