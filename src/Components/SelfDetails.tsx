import React from "react";
import Input from "./Input";
import { FieldError, FieldErrors, UseFormRegister } from "react-hook-form";
import { FormData, Inputs, PersonalData } from "../types/InputTypes";
import Select from "./Select";

type RegisterType = FormData;

type PersonalDetailsProps<RType extends RegisterType> = {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<RegisterType>;
};

const SelfDetails = <RType extends RegisterType>({
  register,
  errors,
}: PersonalDetailsProps<RType>) => {
  return (
    <div>
      <h1>Personal Details</h1>
      <div className="inputs-outer-container">
        <div className="inputs-container">
          {/* <Input
            name="firstName"
            register={register}
            error={errors?.firstName}
            label="Enter your first Name"
            rules={{
              required: `firstName is required`,
            }}
          />
          <Input
            name="lastName"
            register={register}
            error={errors?.lastName}
            label="Enter your last Name"
            rules={{
              required: `lastName is required`,
            }}
          />
          <Input
            name="email"
            register={register}
            error={errors?.email}
            label="Enter your Email"
            rules={{
              required: `email is required`,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
          />
        </div>

        <div className="inputs-container">
          <Input
            name="fatherName"
            register={register}
            error={errors?.fatherName}
            label="Enter your father Name"
            rules={{
              required: `fatherName is required`,
            }}
          />
          <Input
            name="motherName"
            register={register}
            error={errors?.motherName}
            label="Enter your Mother Name"
            rules={{
              required: `motherName is required`,
            }}
          />
        </div>
        <div className="inputs-container">
          <Input
            name="phoneNumber"
            register={register}
            error={errors.phoneNumber}
            label="Enter your Phone Number"
            rules={{
              required: `phoneNumber is required`,
              pattern: {
                value: /^\d{10}$/,
                message: "Invalid phone number",
              },
            }}
          /> */}
          {/* <Select /> */}
          {/* <input key={key} {...register(`familyMembers.${index}.firstName`)} /> */}
        </div>
      </div>
    </div>
  );
};

export default SelfDetails;
