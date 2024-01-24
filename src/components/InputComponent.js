import React from "react";

const InputComponent = ({ type, name, value, disability, func }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      disabled={disability}
      onChange={func}
      required
    />
  );
};

export default InputComponent;
