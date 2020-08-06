/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable no-console */
import React from "react";
import { useSelector } from "react-redux";

import "./Bank.css";
import { getRandomInt } from "../../util";
import { ItemBank } from "../../types/types";
import Item from "./Item";

interface BankProps {
  bank: ItemBank;
  name: string;
}

const Bank: React.FC<BankProps> = ({ name, bank }) => { // todo pass bank / loot data in props
  // const name = useSelector((state: RootState) => state.players[bank.id].name);
  // const name = "DFHSDFGHSDFGH";

  const handleDragStart = (e: React.DragEvent) => { // todo make this work
    console.log(e.currentTarget);
    // e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent) => {
    // console.log(e);
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragLeave = (e: React.DragEvent) => {
    // console.log(e);
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragOver = (e: React.DragEvent) => {
    // console.log(e);
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e: React.DragEvent) => {
    // console.log(e);
    e.preventDefault();
    e.stopPropagation();
  };

  const renderItem = (itemID: number, amount: number) => (
    <Item
      key={`bankItem-${itemID}-${getRandomInt(0, 10000000)}`} // TODO remove random number
      itemID={itemID}
      amount={amount}
      onDragEnter={(e: React.DragEvent) => handleDragEnter(e)}
      onDragLeave={(e: React.DragEvent) => handleDragLeave(e)}
      onDragOver={(e: React.DragEvent) => handleDragOver(e)}
      onDrop={(e: React.DragEvent) => handleDrop(e)}
      onDragStart={(e: React.DragEvent) => handleDragStart(e)}
    />
  );

  const renderBank2 = () => { // todo add some error checks and shit
    console.log(`${name} Bank Rendered`);

    const itemCount = Object.keys(bank).length;

    const bankGrid = [];

    for (let itemID = 0; itemID < itemCount; itemID += 1) {
      const itemInBank = Object.entries(bank)[itemID];
      const [id, amount] = itemInBank;

      bankGrid.push(renderItem(parseInt(id, 10), amount));
    }
    return bankGrid;
  };

  return (
    <div className="bank-window">
      <div className="bank-title">
        <span>{`${name}'s Bank`}</span>
      </div>
      <ul className="bank-inner">
        {renderBank2()}
      </ul>
    </div>
  );
};

export default Bank;
