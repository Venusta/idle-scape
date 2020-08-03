/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React from "react";
import { iconData } from "../App";

interface ItemProps {
  itemID: number;
  amount: number;
}

const Item: React.FC<ItemProps> = ({ itemID, amount }) => (
  <div title={`${itemID}`} className="itemInBank">
    <div className="itemAmount">{amount}</div>
    <img className="itemImage" width="36" height="32" src={`data:image/png;base64, ${iconData[itemID]}`} />
  </div>
);

export default Item;
