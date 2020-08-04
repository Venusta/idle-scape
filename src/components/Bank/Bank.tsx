/* eslint-disable max-len */
/* eslint-disable no-console */
import React from "react";
import { useSelector } from "react-redux";

import "./Bank.css";
import { getRandomInt } from "../../util";
import { RootState } from "../../redux-stuff";
import { Player } from "../../types/types";
import Item from "./Item";

const Bank = (): JSX.Element => { // todo pass bank / loot data in props
  const playerData: Player = useSelector((state: RootState) => state.players[0]); // TODO multi player
  const { name, bank } = playerData;

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>) => { // todo make this work
    console.log(e.currentTarget);
    // e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLLIElement>) => {
    // console.log(e);
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragLeave = (e: React.DragEvent<HTMLLIElement>) => {
    // console.log(e);
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    // console.log(e);
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e: React.DragEvent<HTMLLIElement>) => {
    // console.log(e);
    e.preventDefault();
    e.stopPropagation();
  };

  const renderItem = (itemID: number, amount: number) => (
    <Item
      key={`bankItem-${itemID}-${getRandomInt(0, 10000000)}`} // TODO remove random number
      itemID={itemID}
      amount={amount}
      onDragEnter={(e: React.DragEvent<HTMLLIElement>) => handleDragEnter(e)}
      onDragLeave={(e: React.DragEvent<HTMLLIElement>) => handleDragLeave(e)}
      onDragOver={(e: React.DragEvent<HTMLLIElement>) => handleDragOver(e)}
      onDrop={(e: React.DragEvent<HTMLLIElement>) => handleDrop(e)}
      onDragStart={(e: React.DragEvent<HTMLLIElement>) => handleDragStart(e)}
    />
  );

  const renderBank2 = () => { // todo add some error checks and shit
    console.log(Object.keys(bank).length);

    const itemCount = Object.keys(bank).length;

    let itemIndex = 0;
    const bankGrid = [];

    for (let row = 0; row < itemCount; row += 1) {
      const itemInBank = Object.entries(bank)[itemIndex];
      const [id, amount] = itemInBank;

      itemIndex += 1;
      if (itemIndex >= itemCount) break;

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
