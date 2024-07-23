import { useContext, createContext, useState } from "react";
import { FormData } from "../types/InputTypes";
import { useMyForm } from "./useMyForm";

type ContextType = ReturnType<typeof useMyForm>;

export const FormContext = createContext<ContextType | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};


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
