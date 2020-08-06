/* eslint-disable max-len */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */

import React from "react";
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
}) => (
  <div
    className="itemInBank"
    draggable="true"
    title={`${itemID}`}
    onDragEnter={onDragEnter}
    onDragLeave={onDragLeave}
    onDragOver={onDragOver}
    onDrop={onDrop}
    onDragStart={onDragStart}
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

export default Item;
