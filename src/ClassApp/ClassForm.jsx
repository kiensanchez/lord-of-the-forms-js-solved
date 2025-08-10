import { Component, createRef } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { isEmailValid, checkValidInput } from "../utils/validations";
import { allCities } from "../utils/all-cities";
import { capitalize } from "../utils/transformations";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export class ClassForm extends Component {
  state = {
    firstNameInput: "",
    lastNameInput: "",
    emailInput: "",
    cityInput: "",
    phoneInput: ["", "", "", ""],
  };

  render() {
    const { userData, setIsSubmitted, updateState } = this.props;
    const { firstName, lastName, email, phone, city } = userData;
    const { isSubmitted } = userData;
    const { firstNameInput, lastNameInput, emailInput, cityInput, phoneInput } =
      this.state;

    const refs = [createRef(), createRef(), createRef(), createRef()];

    const handlePhoneChange = (index) => (e) => {
      const maxLength = [2, 2, 2, 1];
      const currentMaxLength = maxLength[index];
      const nextRef = refs[index + 1];
      const prevRef = refs[index - 1];
      const value = e.target.value;

      const shouldGoToNextRef =
        currentMaxLength === value.length && nextRef?.current;
      const shouldGoToPrevRef = value.length === 0;

      const newPhoneState = this.state.phoneInput.map(
        (userPhone, userPhoneIndex) =>
          index === userPhoneIndex ? value : userPhone
      );

      if (shouldGoToNextRef) nextRef.current?.focus();
      if (shouldGoToPrevRef && index !== 0) prevRef.current.focus();

      if (value.toLowerCase() === value.toUpperCase())
        this.setState({ phoneInput: newPhoneState });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      setIsSubmitted();
      updateState(
        emailInput,
        capitalize(firstNameInput),
        capitalize(lastNameInput),
        phoneInput.join(""),
        capitalize(cityInput)
      );
      this.setState({
        firstNameInput: "",
        lastNameInput: "",
        emailInput: "",
        cityInput: "",
        phoneInput: ["", "", "", ""],
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
    };

    return (
      <form onSubmit={handleSubmit}>
        <u>
          <h3>User Information Form</h3>
        </u>

        {/* first name input */}
        <div className="input-wrap">
          <label>{"First Name"}:</label>
          <input
            placeholder="Bilbo"
            value={firstNameInput}
            onChange={(e) => this.setState({ firstNameInput: e.target.value })}
          />
        </div>
        <ErrorMessage
          message={firstNameErrorMessage}
          show={isSubmitted && firstName.length < 2}
        />

        {/* last name input */}
        <div className="input-wrap">
          <label>{"Last Name"}:</label>
          <input
            placeholder="Baggins"
            value={lastNameInput}
            onChange={(e) => this.setState({ lastNameInput: e.target.value })}
          />
        </div>
        <ErrorMessage
          message={lastNameErrorMessage}
          show={isSubmitted && lastName.length < 2}
        />

        {/* Email Input */}
        <div className="input-wrap">
          <label>{"Email"}:</label>
          <input
            placeholder="bilbo-baggins@adventurehobbits.net"
            value={emailInput}
            onChange={(e) => this.setState({ emailInput: e.target.value })}
          />
        </div>
        <ErrorMessage
          message={emailErrorMessage}
          show={isSubmitted && !isEmailValid(email)}
        />

        {/* City Input */}
        <div className="input-wrap">
          <label>{"City"}:</label>
          <input
            placeholder="Hobbiton"
            list="cities"
            value={cityInput}
            onChange={(e) => this.setState({ cityInput: e.target.value })}
          />
        </div>
        <ErrorMessage
          message={cityErrorMessage}
          show={isSubmitted && !allCities.includes(capitalize(city))}
        />

        <div className="input-wrap">
          <label htmlFor="phone">Phone:</label>
          <div id="phone-input-wrap">
            <input
              type="text"
              id="phone-input-1"
              placeholder="55"
              ref={refs[0]}
              value={phoneInput[0]}
              onChange={handlePhoneChange(0)}
            />
            -
            <input
              type="text"
              id="phone-input-2"
              placeholder="55"
              ref={refs[1]}
              value={phoneInput[1]}
              onChange={handlePhoneChange(1)}
            />
            -
            <input
              type="text"
              id="phone-input-3"
              placeholder="55"
              ref={refs[2]}
              value={phoneInput[2]}
              onChange={handlePhoneChange(2)}
            />
            -
            <input
              type="text"
              id="phone-input-4"
              placeholder="5"
              maxLength={1}
              ref={refs[3]}
              value={phoneInput[3]}
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
  }
}
