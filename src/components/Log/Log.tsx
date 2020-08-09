/* eslint-disable max-len */
import React, { useState, useEffect } from "react";

import "./Log.css";

const Log = (): JSX.Element => {
  const initialState: Array<string> = ["you gay", "fuck you", "kanker kut", "one has to be really long cause css is fucking retarded jksdfguia dfouigaduifg adfyug adfuga dfguadfg uadfg uadfg adufg adfu gadfg"];
  const [msgs, setMsgs] = useState(initialState);

  useEffect(() => {
    console.log("Rendered");
    setMsgs([...msgs, "fuck", "noob", "why"]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const MakeList = (): JSX.Element => {
    const sortedTaskData: Array<JSX.Element> = [];
    msgs.forEach((msg, index) => {
      sortedTaskData.push(<div key={index} className="log-item">{msg}</div>);
    });

    return (
      <div className="log-window">
        <div className="log-title">Character Log!</div>
        <div className="log-inner">
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
