export const UserInput = ({ label, inputProps }) => {
  return (
    <>
      <div className="input-wrap">
        <label>{label}:</label>
        <input {...inputProps} />
      </div>
    </>
  );
};
