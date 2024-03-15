import React from "react";
import "./ButtonComponentStyle.css";

const ButtonComponent = ({ className, disabled, onClick, name }) => {
  return (
    <button className={className} disabled={disabled} onClick={onClick}>
      {name}
    </button>
  );
};

export default ButtonComponent;
