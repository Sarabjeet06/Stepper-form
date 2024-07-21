import React, { ReactElement } from 'react'
import { Control, Controller, FieldArray, FieldError, Path, UseFormRegister } from 'react-hook-form'
import { FormData, Inputs } from '../types/InputTypes';

type InputTypes = {
    address: string,
    country: string,
    state: string,

}

type InputControllerProps = {
    control: Control<FormData>
    name: Path<FormData>,
    render: (props: FieldArray)=> ReactElement
}

const InputController: React.FC<InputControllerProps> = ({ name,  control, render }) => {
    console.log("render somthing...")
    return (
        <div>
            <Controller
            name={name}
            control={control}
            render={render}
            />
        </div>
    )
}

export default InputController
