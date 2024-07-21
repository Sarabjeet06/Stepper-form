import React, { useContext, useState } from "react";
import Mainform from "./Mainform";
import { Link } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { DataContext } from "../Context/FormContext";

type PersonalData = {
  email: string;
  firstName: string;
  lastName: string;
  fatherName: string;
  motherName: string;
  phoneNumber: string;
};

type Address = {
  pinCode: string;
  streetName: string;
  city: string;
};

type FormData = PersonalData & {
  familyMembers: PersonalData[];
  address: Address;
};


const ReviewData: React.FC= () => {
  const [isEditClicked, setIsEditClicked] = useState<boolean>(false);
  const { data, setData } = useContext(DataContext);

  const {
    getValues
  } = useFormContext<FormData>();


  console.log(data);
  const formNames = [
    "Personal Details",
    "Family Details",
    "Address Details",
    "Profile Picture",
  ];
  return (
    <div className="review-container">
      <h1>Review Your details</h1>
      {data?.map((formData, index) => (
        <div key={index} className="review-section">
          <h2>{formNames[index]}</h2>
          <div className="review-detail">
            {index === 0 && (
              <div className="review-inner">
                <div className="review-sub-container">
                  <div>First Name: {formData.firstName}</div>
                  <div>Last Name: {formData.lastName}</div>
                  <div>Email: {formData.email}</div>
                </div>
                <div className="review-sub-container">
                  <div>Father Name: {formData.fatherName}</div>
                  <div>Mother Name: {formData.motherName}</div>
                </div>
                <div className="form-buttons">
                  <Link to='/personalDetails'  className="form-button" >Edit</Link>
                </div>
              </div>
            )}
            {index === 1 && (
              <div className="review-inner">
                {formData.familyMembers.map((member, index) => (
                  <div>
                    <h4>Member Detail {index + 1}</h4>
                    <div className="review-sub-container">
                      <div>First Name: {member.firstName}</div>
                      <div>Last Name: {member.lastName}</div>
                    </div>
                    <div className="review-sub-container">
                      <div>Email: {member.email}</div>
                      <div>Father Name: {member.fatherName}</div>
                      <div>Mother Name: {member.motherName}</div>
                    </div>
                    <div className="form-buttons">
                      <Link to='/familyDetails'  className="form-button">Edit</Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {index === 2 && (
              <div className="review-inner">
                <div>City Name: {formData.address.city}</div>
                <div>Pincode: {formData.address.pinCode}</div>
                <div>StreetName: {formData.address.streetName}</div>
                <div className="form-buttons">
                  <Link to='/addressDetails' className="form-button">Edit</Link>
                </div>
              </div>
            )}
            {index === 3 && (
              <div className="review-inner">
                <div>First Name: {formData.address.city}</div>
                <div className="form-buttons">
                  <Link to='/profileImage' className="form-button">Edit</Link>
                </div>
              </div>
            )}
          </div>
          
        </div>
      ))}
    </div>
    // <div className="review-container">
    //   <h1>Review Your details</h1>

    //   <div className="review-detail-inner">
    //     <div>Your First Name</div>
    //     <div>{data?.firstName}</div>
    //   </div>
    //   <div className="review-detail-inner">
    //     <div>Your last Name</div>
    //     <div>{data?.lastName}</div>
    //   </div>
    //   <div className="review-detail-inner">
    //     <div>Your Phone Number</div>
    //     <div>{data?.phoneNumber}</div>
    //   </div>
    //   <div className="review-detail-inner">
    //     <div>Your Email</div>
    //     <div>{data?.email}</div>
    //   </div>
    //   <div className="review-detail-inner">
    //     <div>Your Father Name</div>
    //     <div>{data?.fatherName}</div>
    //   </div>
    //   <div className="review-detail-inner">
    //     <div>Your mother Name</div>
    //     <div>{data?.motherName}</div>
    //   </div>
    // </div>
    // <div className="review-container">
    //   {isEditClicked ? (
    //     <Mainform />
    //   ) : (
    //     <div >
    //       <h1>Review Your details</h1>

    //       <div className="review-detail">
    //         <div className="review-detail-inner">
    //           <div>Your First Name</div>
    //           <div>{data?.firstName}</div>
    //         </div>
    //         <div className="review-detail-inner">
    //           <div>Your last Name</div>
    //           <div>{data?.lastName}</div>
    //         </div>
    //         <div className="review-detail-inner">
    //           <div>Your Phone Number</div>
    //           <div>{data?.phoneNumber}</div>
    //         </div>
    //         <div className="review-detail-inner">
    //           <div>Your Email</div>
    //           <div>{data?.email}</div>
    //         </div>
    //         <div className="review-detail-inner">
    //           <div>Your Father Name</div>
    //           <div>{data?.fatherName}</div>
    //         </div>
    //         <div className="review-detail-inner">
    //           <div>Your mother Name</div>
    //           <div>{data?.motherName}</div>
    //         </div>
    //         <div>
    //           <Link
    //             className="form-button"
    //             onClick={() => {
    //               setIsEditClicked((prevIsClicked) => !prevIsClicked);
    //             }}
    //           >
    //             Edit
    //           </Link>
    //         </div>
    //       </div>

    //       {/* <div>
    //     {data&&Object.entries(data).map(([key,value])=>(
    //         <div>
    //             <div></div>
    //             <div>{key}</div>
    //             <div>
    //                 {typeof value==='object'&& value!==null?(
    //                     Object.entries(value).map(([subKey, subValue]) => (
    //                         <div key={subKey}>
    //                             {subKey}: {subValue}
    //                         </div>
    //                     ))
    //                 ):(
    //                     <div>{value}</div>
    //                 )}
    //             </div>
    //         </div>
    //     ))}
    //   </div> */}
    //     </div>
    //   )}
    // </div>
  );
};

export default ReviewData;
