/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */

import React, { useState } from "react";
import { getIcon } from "../../model/Icon";

interface ItemProps {
  itemID: number;
  amount: number;
  onDragEnter: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onDragStart: (e: React.DragEvent) => void;
}

const Item: React.FC<ItemProps> = ({
  itemID, amount, onDragEnter, onDragLeave, onDragOver, onDrop, onDragStart,
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

  return (
    <div
      className="itemInBank"
      draggable="true"
      title={`${itemID}`}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragStart={onDragStart}
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

export default Item;
