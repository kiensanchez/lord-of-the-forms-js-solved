import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { ProfileInformation } from "../ProfileInformation";

// const defaultUser = {
//   email: "default@default.com",
//   firstName: "Default",
//   lastName: "Default",
//   phone: "1234567",
//   city: "Hobbiton",
// };

export class ClassApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      city: "",
      isSubmitted: false,
    };

    this.setIsSubmitted = this.setIsSubmitted.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  setIsSubmitted() {
    this.setState({ isSubmitted: true });
  }

  updateState(
    emailInput,
    firstNameInput,
    lastNameInput,
    phoneInput,
    cityInput
  ) {
    this.setState({
      email: emailInput,
      firstName: firstNameInput,
      lastName: lastNameInput,
      phone: phoneInput,
      city: cityInput,
    });
  }

  render() {
    return (
      <>
        <h2>Class</h2>
        <ProfileInformation
          userData={this.state}
          isSubmitted={this.state.isSubmitted}
        />
        <ClassForm
          userData={this.state}
          setIsSubmitted={this.setIsSubmitted}
          updateState={this.updateState}
        />
      </>
    );
  }
}
