import React, { useContext } from "react";
import Input from "./Input";
import {
  FieldError,
  FieldErrors,
  Path,
  SubmitHandler,
  useFormContext,
  UseFormRegister,
} from "react-hook-form";
import { FormData, Inputs, PersonalData } from "../types/InputTypes";
import Select from "./Select";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../Context/FormContext";
import { FormContext } from "../Context/useMyFormContext";

type RegisterType = FormData;

type PersonalDetailsProps<RType extends RegisterType> = {
  key: string;
  index: number;
  heading: string;
  dataIndex: number;
};

const PersonalDetails = <RType extends RegisterType>({
  key,
  index,
  heading,
  dataIndex,
}: PersonalDetailsProps<RType>) => {
  const validationRules = {
    firstName: { required: { value: true, message: "firstName is required" } },
    lastName: { required: { value: true, message: "lastName is required" } },
    email: {
      required: { value: true, message: "email is required" },
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email format",
      },
    },
  };

  const navigate = useNavigate();

  const { data, setData } = useContext(DataContext);

  const onSubmit: SubmitHandler<FormData> = (detail) => {
    // setData();
    data[dataIndex] = detail;
    navigate("/reviewDetails");
    console.log(data);
  };

  const { control } = useFormContext<FormData>();
  const { register, formState, handleSubmit } = useContext(FormContext);
  const location = useLocation();
  console.log(location);

  const { errors } = formState;

  return (
    <div>
      {heading === "Personal Details" ? <h1>{heading}</h1> : <h3>{heading}</h3>}
      <div className="inputs-outer-container">
        <div className="inputs-container">
          <Input
            label="Enter first name"
            name={
              index !== -1 ? `familyMembers.${index}.firstName` : "firstName"
            }
            register={register}
            error={errors.firstName}
            rules={validationRules.firstName}
            type="text"
          />

          <Input
            label="Enter Last Name"
            name={index !== -1 ? `familyMembers.${index}.lastName` : "lastName"}
            register={register}
            error={errors.lastName}
            rules={validationRules.lastName}
            type="text"
          />
          <Input
            label="Enter Email"
            name={index !== -1 ? `familyMembers.${index}.email` : "email"}
            register={register}
            error={errors.email}
            rules={validationRules.email}
            type="text"
            // enableDefaultRule={['required']}
            // isEmail
            // rules
          />
        </div>

        <div className="inputs-container">
          <Input
            label="Enter father Number"
            name={
              index !== -1 ? `familyMembers.${index}.fatherName` : "fatherName"
            }
            register={register}
            error={errors.fatherName}
            rules={{
              required: {
                value: true,
                message: `fatherName is required`,
              },
            }}
            type="text"
          />
          <Input
            label="Enter mother Number"
            name={
              index !== -1 ? `familyMembers.${index}.motherName` : "motherName"
            }
            register={register}
            error={errors.motherName}
            rules={{
              required: {
                value: true,
                message: `mothername is required`,
              },
            }}
            type="text"
          />
        </div>

        <div className="inputs-container">
          <Input
            label="Enter your phone Number"
            name={
              index !== -1
                ? `familyMembers.${index}.phoneNumber`
                : "phoneNumber"
            }
            register={register}
            error={errors.phoneNumber}
            rules={{
              required: {
                value: true,
                message: `phoneNumber is required`,
              },
              pattern: {
                value: /^\d{10}$/,
                message: "Invalid phone number",
              },
            }}
            type="text"
          />
        </div>
        <div className="form-buttons">
          {location.pathname === "/personalDetails" && (
            <button onClick={handleSubmit(onSubmit)}>Update</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
