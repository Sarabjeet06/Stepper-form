import React, { useContext, useState } from "react";
import Input from "./Input";
import { Control, SubmitHandler, useFormContext } from "react-hook-form";
import { FormData } from "../types/InputTypes";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../Context/FormContext";

type ProfileImageProps = {
  index: number;
};

const ProfileImage: React.FC<ProfileImageProps> = ({ index }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data, setData } = useContext(DataContext);
  console.log(location);

  const { register, control, watch, handleSubmit, formState } =
    useFormContext<FormData>();
  const [imageUrl, setImageUrl] = useState<string | undefined>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
    } else {
      setImageUrl(undefined);
    }
  };

  const onSubmit: SubmitHandler<FormData> = (detail) => {
    // setData();
    data[index] = detail;
    navigate("/reviewDetails");
    console.log(data);
  };
  return (
    <div className="image-input-container">
      <input
        type="file"
        className="image-input"
        onChange={handleImageChange}
        accept="image/png, image/jpeg"
        // {...register('profileInfo.fileURL')}
      />
      {imageUrl ? (
        <img src={imageUrl} alt="profilePic" style={{ maxHeight: "200px" }} />
      ) : (
        <div className="upload-text">Upload image </div>
      )}
      <div className="form-buttons">
        {location.pathname === "/familyDetails" && (
          <button onClick={handleSubmit(onSubmit)}>Update</button>
        )}
      </div>
    </div>
  );
};

export default ProfileImage;
