import React, { ReactElement, useCallback, useContext, useMemo } from "react";
import Select from "./Select";
import {
  Control,
  FieldArray,
  FieldValue,
  Path,
  SubmitHandler,
  useForm,
  useFormContext,
  UseFormRegister,
} from "react-hook-form";
import { FormData, Inputs } from "../types/InputTypes";
import InputController from "./InputController";
import Input from "./Input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../Context/FormContext";
import { useMyForm } from "../Context/useMyForm";
import { FormContext } from "../Context/useMyFormContext";

type AddressDetailProp = {
  index: number;
};

const AddressDetails: React.FC<AddressDetailProp> = ({ index }) => {
  const navigate = useNavigate();
  const {data,setData } = useContext(DataContext);
  type Option = {
    id: number;
    label: string;
  };

  const { control, watch } = useFormContext<FormData>();
  if (!FormContext) {
    throw new Error("FormContext is not provided!"); // Handle case where context is not provided
  }
  const {register, formState, handleSubmit} = useContext(FormContext);

  const onSubmit: SubmitHandler<FormData> = (detail) => {
    // setData();
    data[index] = detail;
    navigate("/reviewDetails");
    console.log(data);
  };

  const watchCountry = watch("address.country");
  const location = useLocation();
  console.log(location);

  const countryStates: Record<string, Option[]> = {
    USA: [
      { id: 1, label: "New York" },
      { id: 2, label: "California" },
      { id: 3, label: "Texas" },
    ],
    Canada: [
      { id: 4, label: "Ontario" },
      { id: 5, label: "Quebec" },
      { id: 6, label: "British Columbia" },
    ],
    Australia: [
      { id: 7, label: "New South Wales" },
      { id: 8, label: "Victoria" },
      { id: 9, label: "Queensland" },
    ],
    India: [
      { id: 10, label: "Maharashtra" },
      { id: 11, label: "Karnataka" },
      { id: 12, label: "Tamil Nadu" },
    ],
    UK: [
      { id: 13, label: "England" },
      { id: 14, label: "Scotland" },
      { id: 15, label: "Wales" },
    ],
    Germany: [
      { id: 16, label: "Bavaria" },
      { id: 17, label: "Berlin" },
      { id: 18, label: "Hamburg" },
    ],
    Brazil: [
      { id: 19, label: "São Paulo" },
      { id: 20, label: "Rio de Janeiro" },
      { id: 21, label: "Minas Gerais" },
    ],
    Japan: [
      { id: 22, label: "Tokyo" },
      { id: 23, label: "Osaka" },
      { id: 24, label: "Kyoto" },
    ],
    China: [
      { id: 25, label: "Beijing" },
      { id: 26, label: "Shanghai" },
      { id: 27, label: "Guangdong" },
    ],
    SouthAfrica: [
      { id: 28, label: "Gauteng" },
      { id: 29, label: "Western Cape" },
      { id: 30, label: "KwaZulu-Natal" },
    ],
  };

  const countries = Object.keys(countryStates).map((country) => ({
    value: country.toLowerCase(),
    label: country,
  }));

  // const options = [
  //   { value: "us", label: "USA" },
  //   { value: "al", label: "Canada" },
  //   { value: "dz", label: "Australia" },
  //   { value: "ao", label: "Angola" },
  //   { value: "ar", label: "Argentina" },
  //   { value: "am", label: "Armenia" },
  //   { value: "au", label: "Australia" },
  //   { value: "at", label: "Austria" },
  //   { value: "az", label: "Azerbaijan" },
  //   { value: "bs", label: "Bahamas" },
  //   { value: "in", label: "India" },
  // ];

  type PropsType = {
    name: Path<FormData>;
    control: Control<FormData>;
    render: (props: any) => ReactElement;
    options?: any;
  };

  const addressFieldProps: PropsType = {
    name: "address.city",
    control: control,
    render: ({ field }) => (
      <input {...field} type="text" placeholder="Enter Address" />
    ),
  };

  const addressCountryProps: PropsType = {
    name: "address.country",
    control: control,
    render: ({ field }) => (
      <Select
        options={countries}
        name="address.country"
        placeholder="select country"
        control={control}
        {...field}
      />
    ),
  };

  const addressCityProps: PropsType = useMemo(() => {
    return {
      name: "address.city",
      control: control,
      render: ({ field }) => (
        <Select
          options={countryStates[watchCountry]}
          name="address.city"
          placeholder="select city"
          control={control}
          {...field}
        />
      ),
      options: countryStates[watchCountry],
    };
  }, [watchCountry]);
  // console.log(addressCityProps,"hiu");

  const SelectCity = useCallback(() => {
    return <InputController {...addressCityProps} />;
  }, [watchCountry]);
  return (
    <div>
      <h1>Address Details</h1>
      {/* <InputController {...addressFieldProps} /> */}

      <div className="select-container">
        <InputController {...addressCountryProps} />
        {watchCountry && <SelectCity />}
        <Input
          name="address.pinCode"
          label="Enter area pin code"
          type="text"
          register={register}
          rules={{
            required: {
              value: true,
              message: `Pincode is required`,
            },
            pattern: {
              value: /^\d{6}$/,
              message: "Invalid Pincode",
            },
          }}
        />
        <Input
          register={register}
          name="address.streetName"
          label="Enter StreetName"
          type="text"
          rules={{
            required: {
              value: true,
              message: `StreetName is required`,
            },
          }}
        />
      </div>
      <div className="form-buttons">
        {location.pathname === "/addressDetails" && (
          <button type="submit" >Update</button>
        )}
      </div>
    </div>
  );
};

export default AddressDetails;
