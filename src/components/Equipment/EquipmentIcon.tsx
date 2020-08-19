/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React from "react";
import { EquipmentSlotName } from "../../types/types";
import { getIcon, getEquipmentIcon } from "../../model/Icon";

interface ItemProps {
  slot: EquipmentSlotName
  itemID: number;
  amount: string;
  colour: string;
}

export const EquipmentIcon: React.FC<ItemProps> = ({
  slot, itemID, amount, colour,
}) => {
  let extra = "";
  if (amount === "0") {
    extra = " itemImage-placeholder";
  }

  return (
    <div
      className={`equipment-icon-container ${colour}${extra}`}
      title={`${itemID}`}
    >
      <div className="equipment-itemAmount">{amount}</div>
      <img
        className="equipment-image"
        width="36"
        height="36"
        src={`data:image/png;base64, ${getEquipmentIcon(slot)}`}
      />
      <img
        className="equipment-itemImage"
        width="36"
        height="32"
        src={`data:image/png;base64, ${getIcon(itemID)}`}
      />
    </div>
  );
};
