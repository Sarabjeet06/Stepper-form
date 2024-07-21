import { ReactElement, useState } from "react";
import { FieldErrors } from "react-hook-form";
import { FormData } from "../types/InputTypes";


// mutli step Form hook
// Iterator hook
export function useIterator(stepsLength: number){
    const [currentStepIndex, setCurrentStepIndex]=useState<number>(0); 
    // useFOrm
    const next= ()=>{
        // if(errors){
        //     console.log(errors);
        // } 
        setCurrentStepIndex(i=>{
            if(i>=stepsLength-1) return i;
            return i+1;
        })
    }


    const back= ()=>{
        setCurrentStepIndex(i=>{
            if(i<=0) return i;
            return i-1;
        })
    }

    const goto= (index: number)=>{
        // if(errors){
        //     alert('Enter all the fields correctly');
        //     return ;
        // } 
        setCurrentStepIndex(index);
    }

    return {
        currentStepIndex, 
        isFirstStep: currentStepIndex===0,
        isLastStep: currentStepIndex===stepsLength-1,
        next,
        back,
        goto,
    }
}