/* eslint-disable max-len */
import React, { useState, useEffect } from "react";
import { v1 as uuid } from "uuid";

import "./Log.css";

const Log = (): JSX.Element => {
  const initialState: Array<string> = [
    "17:52:13 Marcus finished killing 50 Chickens and received 1245 attack and 348 hitpoints experience! More Details",
    "17:55:34 Maximus finished woodcutting Magic Trees and received 24480 woodcutting experience!",
    "17:55:35 Queued Cooking task (50 raw chickens) for Maximus",
    "17:55:40 Queued Fishing task (1 hour of barbarian fishing) for Marcus",
  ];
  const [msgs, setMsgs] = useState(initialState);

  useEffect(() => {
    console.log("Rendered log");
    setMsgs([...msgs, "extra msg"]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playerName = <span className="name-colour">Maximus</span>;
  const playerexp = <span className="name-colour">24,480</span>;
  const taskName = <span className="name-colour2">Magic Trees</span>;
  const taskAmount = <span className="name-colour3">50x</span>;

  const MakeList = (): JSX.Element => {
    const sortedTaskData: Array<JSX.Element> = [];
    msgs.forEach((msg, index) => {
      sortedTaskData.push(<div key={uuid()} className="log-item">{msg}</div>);
    });

    return (
      <div className="log-window">
        <div className="log-title">Character Log!</div>
        <div className="log-inner">
          <div className="log-item">[17:55:34] {playerName} finished their task of {taskAmount} {taskName} and received {playerexp} woodcutting experience!</div>
          {sortedTaskData}
        </div>
      </div>
    );
  };

  return (
    <MakeList />
  );
};

export default Log;
