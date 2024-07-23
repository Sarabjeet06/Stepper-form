import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Mainform from "./Components/Mainform";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Form, FormProvider, useForm } from "react-hook-form";
import PersonalDetails from "./Components/PersonalDetails";
import FamilyDetails from "./Components/FamilyDetails";
import ProfileImage from "./Components/ProfileImage";
import AddressDetails from "./Components/AddressDetails";
import ReviewData from "./Components/ReviewData";
import { DataProvider } from "./Context/FormContext";
import { MyFormProvider } from "./Context/useMyFormContext";

function App() {
  const methods = useForm();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="" element={<Mainform />}></Route>
        <Route
          path="/personalDetails"
          element={
            <PersonalDetails
              key=""
              index={-1}
              heading="Personal Details"
              dataIndex={0}
            />
          }
        ></Route>
        <Route
          path="/familyDetails"
          element={<FamilyDetails index={1} />}
        ></Route>
        <Route
          path="/addressDetails"
          element={<AddressDetails index={2} />}
        ></Route>
        <Route
          path="/profileImage"
          element={<ProfileImage index={3} />}
        ></Route>
        <Route path="/reviewDetails" element={<ReviewData />}></Route>
      </Route>
    )
  );
  return (
    <div>
      <FormProvider {...methods}>
        <MyFormProvider>
          <DataProvider>
            <RouterProvider router={router} />
          </DataProvider>
        </MyFormProvider>
      </FormProvider>
    </div>
  );
}

export default App;
