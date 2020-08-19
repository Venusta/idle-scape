/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable no-console */
import React, { useEffect } from "react";

import "./Bank.css";
import { useSelector, shallowEqual } from "react-redux";
import { v1 as uuid } from "uuid";
import { ItemData } from "../../types/types";
import { Item } from "./Item";
import { RootState, useAppDispatch } from "../../redux-stuff";
import { updateBank } from "../../slices/character";

interface BankProps {
  id: string;
}

export const Bank: React.FC<BankProps> = ({ id }) => { // todo pass bank / loot data in props
  const name: string = useSelector((state: RootState) => state.characters.names[id], shallowEqual);
  const bank: ItemData[] = useSelector((state: RootState) => state.characters.banks[id], shallowEqual);
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   console.log(`${name} bank updated oh god`);
  //   dispatch(updateBank({ playerID: id, bank }));
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [bank]);

  const handleDragStart = (e: React.DragEvent) => { // todo make this work
    console.log(e.target);
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

  const renderItem = (itemID: number, { amount, colour }: {amount: string, colour: string}): JSX.Element => (
    <Item
      key={`bankItem-${uuid()}`}
      itemID={itemID}
      amount={amount}
      colour={colour}
    />
  );

  const formatStackNumbers = (number: number) => {
    const suffix: string[] = ["", "K", "M", "B", "T", "Q"];
    const colours: string[] = ["yellow", "white", "green", "cyan", "orange", "pink"];
    let size = number.toString().length;

    let index = 0;

    if (size >= 6) {
      while (size >= 5) {
        size -= 3;
        index += 1;
      }
      // console.log(`number: ${number} (${number.toString().length})- size: ${size} index: ${index}`);
    }
    return { amount: `${number.toString().slice(0, size)}${suffix[index]}`, colour: colours[index] };
  };
  /*
  length  needTo      digitsToSlice
  5     = 10000       -0
  6     = 100k        -3
  7     = 1000k       -3
  8     = 10m         -6
  9     = 100m        -6
  10    = 1000m       -6
  11    = 10b         -9
  12    = 100b        -9
  13    = 1000b       -9

    99,999 => 99999
    100,000 => 100k
    1,000,000 => 1000k
    10,000,000 => 10m
    100,000,000 => 100m
    1,000,000,000 => 1000m
    10,000,000,000 => 10b

  */

  const renderBank2 = () => { // todo add some error checks and shit
    console.log(`${name} Bank Rendered`);

    const bankGrid: JSX.Element[] = [];

    bank.forEach((itemInBank) => {
      bankGrid.push(renderItem(itemInBank.item, { ...formatStackNumbers(itemInBank.amount) }));
    });

    return bankGrid;
  };

  return (
    <div className="bank-window panel-window">
      <div className="bank-title panel-title">
        {`${name}'s Bank`}
      </div>
      <div className="bank-inner">
        <div
          className="bank-wrapper"
          onDragStart={handleDragStart}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {renderBank2()}
        </div>
      </div>
    </div>
  );
};
