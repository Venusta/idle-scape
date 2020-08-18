/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable max-len */
import React, { useRef, useLayoutEffect } from "react";
import { v1 as uuid } from "uuid";

import "./Log.css";
import { useSelector, shallowEqual } from "react-redux";
import { RootState } from "../../redux-stuff";

const Log = (): JSX.Element => {
  const items = useSelector((state: RootState) => state.log.items, shallowEqual);

  const ref = useRef<HTMLDivElement>(null);

  const regex = /<([\w-]+#)(.*?)>/gi;
  // const replace = "<span className=\"$1\">$2</span>";

  useLayoutEffect(() => {
    if (ref.current !== null) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [items]);

  const playerName = <span className="name-colour">Maximus</span>;
  const playerexp = <span className="name-colour">24,480</span>;
  const taskName = <span className="name-colour2">Magic Trees</span>;
  const taskAmount = <span className="name-colour3">50x</span>;

  const MakeList = (): JSX.Element => {
    const sortedTaskData: Array<JSX.Element> = [];
    items.forEach(({ msg }) => {
      const finalResult = msg.split(regex).map((thing, index, all) => {
        if (thing.endsWith("#")) {
          return <span key={uuid()} className={thing.slice(0, -1)}>{all[index + 1]}</span>;
        }
        if (all[index - 1] && all[index - 1].endsWith("#")) return "";
        return thing || "";
      }).filter((item) => item !== "");
      sortedTaskData.push(<div key={uuid()} className="log-item">{finalResult}</div>);
    });

    return (
      <div className="log-window">
        <div className="log-title">Character Log</div>
        <div ref={ref} className="log-inner">
          <div className="log-inner-inner">
            {/* <div className="log-item">[17:55:34] {playerName} finished their task of {taskAmount} {taskName} and received {playerexp} woodcutting experience!</div> */}
            {/* <div className="log-item"><span className="orange">Maximus Decimus Meridius</span> queued a cooking task of <span className="green">2x chickens</span></div> */}
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
