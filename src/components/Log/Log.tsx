/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable max-len */
import React from "react";
import { v1 as uuid } from "uuid";

import "./Log.css";
import { useSelector, shallowEqual } from "react-redux";
import { RootState } from "../../redux-stuff";

const Log = (): JSX.Element => {
  const items = useSelector((state: RootState) => state.log.items, shallowEqual);

  const playerName = <span className="name-colour">Maximus</span>;
  const playerexp = <span className="name-colour">24,480</span>;
  const taskName = <span className="name-colour2">Magic Trees</span>;
  const taskAmount = <span className="name-colour3">50x</span>;

  const MakeList = (): JSX.Element => {
    const sortedTaskData: Array<JSX.Element> = [];
    items.forEach((msg, index) => {
      sortedTaskData.push(<div key={uuid()} className="log-item">{msg}</div>);
    });

    return (
      <div className="log-window">
        <div className="log-title">Character Log!</div>
        <div className="log-inner">
          <div className="log-inner-inner">
            <div className="log-item">[17:55:34] {playerName} finished their task of {taskAmount} {taskName} and received {playerexp} woodcutting experience!</div>
            {sortedTaskData}
          </div>
        </div>
      </div>
    );
  };

  return (
    <MakeList />
  );
};

export default Log;
