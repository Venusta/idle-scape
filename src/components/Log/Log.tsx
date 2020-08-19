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

  useLayoutEffect(() => { // todo only scroll if at the bottom of the list
    if (ref.current !== null) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [items]);

  const MakeList = (): JSX.Element => {
    const sortedTaskData: Array<JSX.Element> = [];
    items.forEach(({ msg }) => {
      const finalResult = msg.split(regex).reduce((accum: Array<string | JSX.Element>, thing, index, splitMsg) => {
        if (thing.endsWith("#") && splitMsg[index + 1]) {
          return [...accum, <span key={uuid()} className={thing.slice(0, -1)}>{splitMsg[index + 1]}</span>];
        }
        if (splitMsg[index - 1] && splitMsg[index - 1].endsWith("#")) return accum;
        return [...accum, thing];
      }, []);

      sortedTaskData.push(<div key={uuid()} className="log-item item-bubble">{finalResult}</div>);
    });

    return (
      <div className="log-window panel-window">
        <div className="log-title panel-title">Character Log</div>
        <div ref={ref} className="log-inner">
          <div className="log-inner-inner">
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
