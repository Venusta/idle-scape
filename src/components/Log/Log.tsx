/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable max-len */
import React, { useRef, useLayoutEffect } from "react";
import { v1 as uuid } from "uuid";

import "./Log.css";
import { useSelector, shallowEqual } from "react-redux";
import { LogMsgBuilder } from "../../constants/builders/LogMsgBuilder";
import { RootState } from "../../redux-stuff";
import { ItemData } from "../../types/types";
import { Item } from "../Bank/Item";

export const Log = (): JSX.Element => {
  const items = useSelector((state: RootState) => state.log.items, shallowEqual);

  const ref = useRef<HTMLDivElement>(null);

  const regex = /<([\w-]+#)(.*?)>/gi;

  useLayoutEffect(() => { // todo only scroll if at the bottom of the list
    if (ref.current !== null) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [items]);

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
    }
    return { amount: `${number.toString().slice(0, size)}${suffix[index]}`, colour: colours[index] };
  };

  const renderBank2 = (name: string, bank: ItemData[]) => { // todo add some error checks and shit
    console.log(`${name} Log bank Rendered`);

    const bankGrid: JSX.Element[] = [];

    bank.forEach((itemInBank) => {
      bankGrid.push(renderItem(itemInBank.item, { ...formatStackNumbers(itemInBank.amount) }));
    });

    return bankGrid;
  };

  const NewListShit = (): JSX.Element => {
    console.error("sdguiadfuigadfg");

    console.log(items);
    const sortedTaskData: Array<JSX.Element> = [];
    let ohMyGod: Array<JSX.Element> = [];

    items.forEach((item) => {
      // @ts-ignore
      const {
        characterId, gained, reward, type, characterName, info: { name, amount },
      } = item;

      const msg = new LogMsgBuilder()
        .finished(characterName, type, amount, name)
        .gainingExp(reward.exp)
        .andLevels(gained)
        .returnMsg();
      console.log(msg);

      const finalResult = msg.split(regex).reduce((accum: Array<string | JSX.Element>, thing, index, splitMsg) => {
        if (thing.endsWith("#") && splitMsg[index + 1]) {
          return [...accum, <span key={uuid()} className={thing.slice(0, -1)}>{splitMsg[index + 1]}</span>];
        }
        if (splitMsg[index - 1] && splitMsg[index - 1].endsWith("#")) return accum;
        return [...accum, thing];
      }, []);

      ohMyGod = (renderBank2("jfc", reward.items));
      sortedTaskData.push(
        <div key={uuid()} className="log-item item-bubble">
          {finalResult}
          <div className="loot-table">
            {ohMyGod}
          </div>
        </div>,
      );
    });

    return (
      <div className="log-inner-inner">
        {sortedTaskData}
      </div>
    );
  };

  return (
    <div className="log-window panel-window">
      <div className="log-title panel-title">Character Log</div>
      <div ref={ref} className="log-inner">
        {/* <div className="log-inner-inner"> */}

        <NewListShit />
        {/* </div> */}
      </div>
    </div>
  );
};
