/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import "./Bank.css";
import { getRandomInt } from "../../util";
import { RootState } from "../../redux-stuff";
import { ItemBank, ItemData } from "../../types/types";
import { iconData } from "../App";
import Item from "./Item";

const Bank = (): JSX.Element => {
  const bankData: ItemBank = useSelector((state: RootState) => state.players[0].bank); // TODO multi player

  const renderItem = (itemID: number, amount: number) => (
    <Item
      key={`bankItem-${itemID}-${getRandomInt(0, 10000000)}`} // TODO remove random number
      itemID={itemID}
      amount={amount}
    />
  );

  const renderBank = () => { // todo fix this up it's incredibly yolo
    console.log(Object.keys(bankData).length);

    const itemCount = Object.keys(bankData).length;
    const columns = 8;
    const rows = Math.ceil(itemCount / columns);

    let itemIndex = 0;
    const bankGrid = [];

    for (let row = 0; row < rows; row += 1) {
      const bankRow = [];

      for (let column = 0; column < columns; column += 1) {
        const itemInBank = Object.entries(bankData)[itemIndex];
        const [id, amount] = itemInBank;

        bankRow.push(renderItem(parseInt(id, 10), amount));
        itemIndex += 1;
        if (itemIndex >= itemCount) break;
      }
      bankGrid.push(<div key={`row${row}`} className="bank-row">{bankRow}</div>);
    }
    return bankGrid;
  };

  const bankList = Object.entries(bankData).map(([id, amount]: [string, number]) => { // TODO TYPES
    return (
      <li key={id}>
        {`${amount}`}
        <img width="36" height="32" src={`data:image/png;base64, ${iconData[id]}`} />
      </li>
    );
  });

  return (
    <div className="bank-window">
      <div className="bank-title">
        <span>Bank</span>
      </div>
      <div className="bank-inner">
        <div>{renderBank()}</div>
      </div>
      {/* <ol>{bankList}</ol> */}
      {/* <img width="32" height="32" src="/4151.png" />
      <img width="32" height="32" src="/0.png" /> */}
      {/* <img width="32" height="32" src={`data:image/png;base64, ${iconData[0]}`} />
      <img width="32" height="32" src={`data:image/png;base64, ${iconData[4151]}`} /> */}
    </div>
  );
};

export default Bank;
