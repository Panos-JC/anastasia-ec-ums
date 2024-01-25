import React from "react";

const ButtonComponent = ({ className, disability, func, name }) => {
  return (
    <button className={className} disabled={disability} onClick={func}>
      {name}
    </button>
  );
};

export default ButtonComponent;
