import { useState } from "react";
import { ProfileInformation } from "../ProfileInformation";
import { FunctionalForm } from "./FunctionalForm";

export const FunctionalApp = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    phone: ["", "", "", ""],
  });
  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation userData={userData} isSubmitted={isSubmitted} />
      <FunctionalForm
        isSubmitted={isSubmitted}
        setIsSubmitted={setIsSubmitted}
        userData={userData}
        setUserData={setUserData}
      />
    </>
  );
};
