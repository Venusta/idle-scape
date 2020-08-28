import React from "react";
import { v1 as uuid } from "uuid";
import { EquipmentIcon } from "./EquipmentIcon";
import "./Equipment.css";
import { EquipmentSlotNames } from "../../types/types";

export const Equipment = (): JSX.Element => {
  const itemID = 4151;
  const amount = "1";
  const colour = "yellow";

  const icons: Array<JSX.Element> = [];

  Object.values(EquipmentSlotNames).forEach((slot) => {
    icons.push(
      <EquipmentIcon
        key={`equipIcon-${uuid()}`}
        itemID={itemID}
        amount={amount}
        colour={colour}
        slot={slot}
      />,
    );
  });

  return (
    <div className="equipment-window panel-window">
      <div className="panel-title">
        Equipment
      </div>
      <div className="equipment-inner">
        {icons}
      </div>
    </div>
  );
};
