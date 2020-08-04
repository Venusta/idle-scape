/* eslint-disable max-len */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */

import React from "react";
import { getIcon } from "../../model/Icon";

interface ItemProps {
  itemID: number;
  amount: number;
  onDragEnter: (e: React.DragEvent<HTMLLIElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLLIElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLLIElement>) => void;
  onDrop: (e: React.DragEvent<HTMLLIElement>) => void;
  onDragStart: (e: React.DragEvent<HTMLLIElement>) => void;
}

const Item: React.FC<ItemProps> = ({
  itemID, amount, onDragEnter, onDragLeave, onDragOver, onDrop, onDragStart,
}) => (
  <li
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
  </li>
);

export default Item;
