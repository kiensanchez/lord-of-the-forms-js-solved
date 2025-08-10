import { useRef, useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { allCities } from "../utils/all-cities";
import { capitalize } from "../utils/transformations";
import { isEmailValid, checkValidInput } from "../utils/validations";
import { UserInput } from "./FunctionalComponents/UserInput";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm = ({
  isSubmitted,
  setIsSubmitted,
  userData,
  setUserData,
}) => {
  const { firstName, lastName, email, city, phone } = userData;
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [phoneInput, setPhoneInput] = useState(["", "", "", ""]);

  const refs = [useRef(), useRef(), useRef(), useRef()];

  const handlePhoneChange = (index) => (e) => {
    const maxLength = [2, 2, 2, 1];
    const currentMaxLength = maxLength[index];
    const value = e.target.value;
    const nextRef = refs[index + 1];
    const prevRef = refs[index - 1];

    const shouldGoToNextRef =
      currentMaxLength === value.length && nextRef?.current;
    const shouldGoToPrevRef = value.length === 0;

    const newPhoneState = phoneInput.map((userPhone, userPhoneIndex) =>
      index === userPhoneIndex ? value : userPhone
    );

    if (shouldGoToNextRef) {
      nextRef.current?.focus();
    }

    if (shouldGoToPrevRef && index !== 0) {
      prevRef.current.focus();
    }

    if (value.toLowerCase() === value.toUpperCase())
      setPhoneInput(newPhoneState);
  };

  const reset = () => {
    setFirstNameInput("");
    setLastNameInput("");
    setEmailInput("");
    setCityInput("");
    setPhoneInput(["", "", "", ""]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    setUserData({
      firstName: capitalize(firstNameInput),
      lastName: capitalize(lastNameInput),
      email: emailInput,
      city: capitalize(cityInput),
      phone: phoneInput.join(""),
    });

    if (
      !checkValidInput(
        firstNameInput,
        lastNameInput,
        emailInput,
        cityInput,
        phoneInput
      )
    ) {
      alert("Bad Data Input");
    }

    reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <UserInput
        label={"First Name"}
        inputProps={{
          placeholder: "Bilbo",
          value: firstNameInput,
          onChange: (e) => setFirstNameInput(e.target.value),
        }}
      />
      <ErrorMessage
        message={firstNameErrorMessage}
        show={isSubmitted && firstName.length < 2}
      />
      {/* last name input */}
      <UserInput
        label={"Last Name"}
        inputProps={{
          placeholder: "Baggins",
          value: lastNameInput,
          onChange: (e) => setLastNameInput(e.target.value),
        }}
      />
      <ErrorMessage
        message={lastNameErrorMessage}
        show={isSubmitted && lastName.length < 2}
      />

      {/* Email Input */}
      <UserInput
        label={"Email"}
        inputProps={{
          placeholder: "bilbo-baggins@adventurehobbits.net",
          value: emailInput,
          onChange: (e) => setEmailInput(e.target.value),
        }}
      />
      <ErrorMessage
        message={emailErrorMessage}
        show={isSubmitted && !isEmailValid(email)}
      />

      {/* City Input */}
      <UserInput
        label={"City"}
        inputProps={{
          placeholder: "Hobbiton",
          list: "cities",
          value: cityInput,
          onChange: (e) => setCityInput(e.target.value),
        }}
      />
      <ErrorMessage
        message={cityErrorMessage}
        show={isSubmitted && !allCities.includes(city)}
      />

      <div className="input-wrap">
        <label htmlFor="phone">Phone:</label>
        <div id="phone-input-wrap">
          <input
            type="text"
            id="phone-input-1"
            ref={refs[0]}
            placeholder="55"
            value={phoneInput[0]}
            onChange={handlePhoneChange(0)}
          />
          -
          <input
            type="text"
            id="phone-input-2"
            ref={refs[1]}
            placeholder="55"
            value={phoneInput[1]}
            onChange={handlePhoneChange(1)}
          />
          -
          <input
            type="text"
            id="phone-input-3"
            ref={refs[2]}
            placeholder="55"
            value={phoneInput[2]}
            onChange={handlePhoneChange(2)}
          />
          -
          <input
            type="text"
            id="phone-input-4"
            ref={refs[3]}
            placeholder="5"
            value={phoneInput[3]}
            maxLength={1}
            onChange={handlePhoneChange(3)}
          />
        </div>
      </div>

      <ErrorMessage
        message={phoneNumberErrorMessage}
        show={isSubmitted && phone.length !== 7}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};
