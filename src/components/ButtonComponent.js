import React from "react";

const ButtonComponent = ({ className, disabled, onClick, name }) => {
  return (
    <button className={className} disabled={disabled} onClick={onClick}>
      {name}
    </button>
  );
};

export default ButtonComponent;
