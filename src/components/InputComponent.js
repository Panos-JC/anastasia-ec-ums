import React from "react";

const InputComponent = ({ type, name, value, disabled, onChange, label }) => {
  return (
    <>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        required
      />
    </>
  );
};

export default InputComponent;
