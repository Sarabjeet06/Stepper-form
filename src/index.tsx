import React, { ReactElement, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Mainform from './Components/Mainform';
import PersonalDetails from './Components/PersonalDetails';
import AddressDetails from './Components/AddressDetails';
import FamilyDetails from './Components/FamilyDetails';
import ProfileImage from './Components/ProfileImage';
import { useIterator } from './CustomHooks/useIterator';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { FormData } from './types/InputTypes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// const {
//   register,
//   handleSubmit,
//   watch,
//   formState: { errors },
//   control,
// } = useForm<FormData>({
//   defaultValues: {
//     firstName: "",
//     lastName: "",
//     email: "",
//     fatherName: "",
//     motherName: "",
//     phoneNumber: "",
//     familyMembers: [
//       {
//         firstName: "",
//         lastName: "",
//         email: "",
//         fatherName: "",
//         motherName: "",
//         phoneNumber: "",
//       },
//     ],
//     address: {
//       pinCode: "",
//       streetName: "",
//       city: "",
//     },
//   },
// });
// const { fields, append, remove } = useFieldArray({
//   name: "familyMembers",
//   control,
// });

// const [finishClicked, setFinishedClicked] = useState<boolean>(false);
// const [formData, setFormData] = useState<FormData>();
// const [activeStepper, setActiveStepper] = useState<number>(1);
// const steppers = [1, 2, 3, 4];
// const [clickedPage, setClickedPage] = useState<number>(0);
// const [allFormDetails,setAllFormDetails]=useState<FormData[]>([]);

// const watchCountry=watch('address.country');
// console.log(control._formValues)
// console.log(watchCountry);

// // console.log(register);
// const steps :ReactElement[]=[
//   <PersonalDetails register={register} errors={errors} key="" index={-1}  heading="Personal Details" />,
//   <FamilyDetails
//     register={register}
//     errors={errors}
//     fields={fields}
//     append={append}
//     remove={remove}
//   />,
//   <AddressDetails control={control}  watchCountry={watchCountry}  />,
//   <ProfileImage />
// ]

// const {
//   currentStepIndex,
//   isFirstStep,
//   isLastStep,
//   back,
//   next,
//   goto,
// } = useIterator(steps.length);

// const handleButtonClick = (index: number)=>{
//   setClickedPage(index);
// }

// const onSubmit: SubmitHandler<FormData> = (data) => {
//   // if(final -> review) // else nexform
//   setAllFormDetails(prevAllFormData=>[...prevAllFormData, data]);
//   if (!isLastStep) {
//     next();
//   } else {
//     console.log("In review form");
//     setFinishedClicked(true);
//     setFormData(data);
//   }

//   console.log(data);
// };



root.render(
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
