import { Component } from "react";

export class UserInputClass extends Component {
  render() {
    const { label, inputProps, setNewInput } = this.props;
    return (
      <>
        <div className="input-wrap">
          <label>{label}:</label>
          <input {...inputProps} />
        </div>
      </>
    );
  }
}
