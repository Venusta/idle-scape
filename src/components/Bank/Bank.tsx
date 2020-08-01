/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import "./Bank.css";
import { RootState } from "src/redux-stuff";
import { ItemBank, ItemData } from "src/types/types";

const Sidebar = () => {
  const bankData: ItemBank = useSelector((state: RootState) => state.players[0].bank); // TODO multi player

  const x = Object.entries(bankData).map(([id, amount]: [string, number]) => { // TODO TYPES
    return <li key={id}>{`${id} ${amount}`}</li>;
  });

  return (
    <div className="sidebar">
      <div className="titleBar">
        <span>Bank</span>
      </div>
      <ol>
        {x}
      </ol>
    </div>
  );
};

export default Sidebar;
