/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState } from "react";
import "./ToggleButton.css";

const ToggleButton = ({ enabled, onToggle, title }) => {
  const [toggle, setToggle] = useState(enabled || false);

  const handleClick = () => {
    setToggle(!toggle);
    onToggle();
  };

  return (
    <button type="button" title={title} className={`toggle-button ${toggle ? "selected" : ""}`} onClick={handleClick}>{`${toggle ? "True" : "False"}`}</button>
  );
};

export default ToggleButton;
