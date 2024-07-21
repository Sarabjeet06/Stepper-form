import React, { ReactElement, useContext, useEffect, useState } from "react";
import PersonalDetails from "./PersonalDetails";
import {
  FieldArrayWithId,
  FieldError,
  FieldErrors,
  Path,
  SubmitHandler,
  useFieldArray,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  useFormContext,
  UseFormRegister,
} from "react-hook-form";
import { Inputs, PersonalData } from "../types/InputTypes";
import { FormData } from "../types/InputTypes";
import Input from "./Input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../Context/FormContext";
import { useIterator } from "../CustomHooks/useIterator";

type MemberTypes = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  fatherName: string;
  motherName: string;
};

type FamilyProps={
  index: number;
}

const FamilyDetails: React.FC<FamilyProps> = ({index}) => {
  // const [familyMembers, setFamilyMembers]= useState<ReactElement[]>();
  const navigate=useNavigate();
  const { register, formState, control, handleSubmit } =
    useFormContext<FormData>();
  const location = useLocation();
  console.log(location);
  const [updateClicked, setUpdateClicked] = useState<boolean>(false);
  const { data, setData } = useContext(DataContext);

  const { errors } = formState;
  register("familyMembers" as Path<FormData>);
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "familyMembers",
  });
  // const addFamilyMembers = () =>{
  //     setFamilyMembers([...familyMembers])
  // }
  /// familyMembers[0].firstName

  const addNewMember = () => {
    append({
      firstName: "",
      lastName: "",
      fatherName: "",
      motherName: "",
      phoneNumber: "",
      email: "",
    });
  };

  const onSubmit: SubmitHandler<FormData> = (detail) => {
    setUpdateClicked(true);
    // setData();
    data[index]=detail;
    navigate('/reviewDetails');
    console.log(data);
  };

  const removeMember = (index: number) => {
    remove(index);
  };

  useEffect(() => {
    if (fields.length === 0) addNewMember();
  }, []);

  return (
    <div>
      <h1>Family Details</h1>
      <div>
        {fields?.map((field, index) => (
          <div>
            {/* <Input register={register(`test.${index}.test`)} /> */}
            <PersonalDetails
              key={field.id}
              index={index}
              heading={`Personal Detail of family member ${index + 1}`}
              dataIndex={0}
            />
            <div className="family-buttons">
              <button className="add-button" onClick={addNewMember}>
                Add
              </button>
              {fields.length > 1 && (
                <button
                  className="remove-button"
                  onClick={() => {
                    removeMember(index);
                  }}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="form-buttons">
        {location.pathname === "/familyDetails" && (
          <button onClick={handleSubmit(onSubmit)}>Update</button>

        )}
      </div>
    </div>
  );
};

export default FamilyDetails;
