import { useContext , createContext, useState } from "react";
import { FormData } from "../types/InputTypes";


type ContextType = {
    data: FormData[];
    setData: React.Dispatch<React.SetStateAction<FormData[]>>;
  };
  
  export const DataContext = createContext<ContextType>({
    data: [],
    setData: () => {},
  });

interface PropsType{
    children?: React.ReactNode
}

export const DataProvider: React.FC<PropsType>= (props)=>{
    const [data,setData]=useState<FormData[]>([]);

    return (
        <DataContext.Provider value={{data, setData}}>
            {props.children}
        </DataContext.Provider>
    )
}