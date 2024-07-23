import React, { ReactElement, useContext, useState } from "react";
import {
  useForm,
  SubmitHandler,
  FieldError,
  useFieldArray,
  Control,
  useFormContext,
} from "react-hook-form";
import Input from "./Input";
import { useIterator } from "../CustomHooks/useIterator";
import PersonalDetails from "./PersonalDetails";
import { Inputs, FormData } from "../types/InputTypes";
import FamilyDetails from "./FamilyDetails";
import AddressDetails from "./AddressDetails";
// import SelfDetails from "./SelfDetails";
import ReviewData from "./ReviewData";
import ProfileImage from "./ProfileImage";
import { useCustomForm } from "../CustomHooks/useCustomForm";
import { Link } from "react-router-dom";
import { DataContext } from "../Context/FormContext";
import { useMyForm } from "../Context/useMyForm";

// type MainFrameProps={
//   finishClicked: boolean;
//   handleSubmit: ReturnType<typeof useForm>['handleSubmit'];
//   control: Control<FormData>;
//   steps: ReactElement[];
//   allFormDetails: FormData[];
//   onSubmit: SubmitHandler<FormData>;
// }

const Mainform: React.FC = () => {
  const {
    control,
    watch,
  } = useFormContext<FormData>();
  const { register, formState, handleSubmit } = useMyForm<FormData>();
  const {errors}=formState;
  console.log(control);
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: 'familyMembers', 
  });
  // const {
  //   register,
  //   errors,
  //   fields,
  //   append,
  //   remove,
  //   control,
  //   watch,
  //   handleSubmit,
  // } = useCustomForm();
  const watchCountry = watch("address.country");
  const [finishClicked, setFinishedClicked] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>();
  const [activeStepper, setActiveStepper] = useState<number>(1);
  const steppers = [1, 2, 3, 4];
  const [clickedPage, setClickedPage] = useState<number>(0);
  const [allFormDetails, setAllFormDetails] = useState<FormData[]>([]);
  const { data, setData } = useContext(DataContext);

  const steps: ReactElement[] = [
    <PersonalDetails
      key=""
      index={-1}
      heading="Personal Details"
      dataIndex={0}
    />,
    <FamilyDetails index={1} />,
    <AddressDetails index={2} />,
    <ProfileImage index={3}  />,
  ];

  const { currentStepIndex, isFirstStep, isLastStep, back, next, goto } =
    useIterator(steps.length);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // if(final -> review) // else nexform
    setData((prevData) => [...prevData, data]);
    if (!isLastStep) {
      next();
    } else {
      console.log("In review form");
      setFinishedClicked(true);
      setFormData(data);
    }

    console.log(data);
  };

  return (
    <div className="form-main-container">
      <div className="outer-container">
        
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-container">
              <div className="container">
                <div className="currentpage-container">
                  {currentStepIndex + 1}/{steps.length}
                </div>
                <div className="steps-container">
                  {steps.map((_, index) => {
                    return (
                      <button
                        className="step-num"
                        // onClick={()=>handleButtonClick(index)}
                        // type={`${clickedPage<currentStepIndex?'button': 'submit'}`}
                        type="button"
                        onClick={() => {
                          goto(index);
                        }}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                </div>
                <div>{steps[currentStepIndex]}</div>
                <div className="form-buttons">
                  {!isLastStep ? (
                    <button className="form-button">Next</button>
                  ) : (
                    <Link to='/reviewDetails' className="form-button">Finish</Link>
                  )}
                </div>
              </div>
            </div>
          </form>
      </div>
    </div>
  );
};

export default Mainform;
