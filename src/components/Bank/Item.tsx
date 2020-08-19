/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */

import React, { useState } from "react";
import { getIcon } from "../../model/Icon";

interface ItemProps {
  itemID: number;
  amount: string;
  colour: string;
  // onDragEnter: (e: React.DragEvent) => void;
  // onDragLeave: (e: React.DragEvent) => void;
  // onDragOver: (e: React.DragEvent) => void;
  // onDrop: (e: React.DragEvent) => void;
  // onDragStart: (e: React.DragEvent) => void;
}

export const Item: React.FC<ItemProps> = ({
  itemID, amount, colour,
}) => {
  const [coords, setCoords] = useState([0, 0]);
  const [visible, setVisible] = useState(false);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(`Yeet! ${itemID}`);
    setCoords([e.clientX, e.clientY]);
    setVisible(true);
    console.log(coords);

    console.log(e.clientX);
    console.log(e.clientY);
  };
  const handleClick = (e: React.MouseEvent) => {
    setVisible(false);
  };

  const Menu = () => (
    <div className="menu" style={{ display: `${visible ? "show" : "none"}` }}>
      <ul className="menu-options">
        <li className="menu-option">Back</li>
        <li className="menu-option">Reload</li>
        <li className="menu-option">Save</li>
        <li className="menu-option">Save As</li>
        <li className="menu-option">Inspect</li>
      </ul>
    </div>
  );
  let extra = "";
  if (amount === "0") {
    extra = " itemImage-placeholder";
  }

  return (
    <div
      className={`itemInBank ${colour}${extra}`}
      draggable="true"
      title={`${itemID}`}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      <div className="itemAmount">{amount}</div>
      <img
        className="itemImage"
        width="36"
        height="32"
        src={`data:image/png;base64, ${getIcon(itemID)}`}
      />
    </div>
  );
};
