/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable no-console */
import React from "react";

import "./Bank.css";
import { useSelector, shallowEqual } from "react-redux";
import { getRandomInt } from "../../util";
import { ItemData } from "../../types/types";
import Item from "./Item";
import { RootState } from "../../redux-stuff";

interface BankProps {
  id: string;
}

const Bank: React.FC<BankProps> = ({ id }) => { // todo pass bank / loot data in props
  const name: string = useSelector((state: RootState) => state.characters.names[id], shallowEqual);
  const bank: ItemData[] = useSelector((state: RootState) => state.characters.banks[id], shallowEqual);

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

  const renderItem = (itemID: number, amount: number): JSX.Element => (
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

    const bankGrid: JSX.Element[] = [];

    bank.forEach((itemInBank) => {
      bankGrid.push(renderItem(itemInBank.item, itemInBank.amount));
    });

    return bankGrid;
  };

  return (
    <div className="bank-window">
      <div className="bank-title">
        <span>{`${name}'s Bank`}</span>
      </div>
      <div className="bank-inner">
        {renderBank2()}
      </div>
    </div>
  );
};

export default Bank;
