/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState } from "react";
import "./ImageButton.css";
import { asset } from "../../utils.ts.old";

const ImageButton = ({ enabled, title }) => {
  const [toggle, setToggle] = useState(enabled || false);

  const handleClick = () => {
    setToggle(!toggle);
  };

  return (
    <div className={`image-button ${toggle ? "selected" : ""}`} onClick={handleClick} role="button">
      <img src={asset("white")} title={title} className="img" />
    </div>
  );
};

export default ImageButton;
