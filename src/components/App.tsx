/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { handleReward, RootState, addExp } from "../redux-stuff";
import { SkillNames } from "../constants/data";
import Laps from "../constants/player/laps";

const App = () => {
  const dispatch = useDispatch();
  const [time, setTime] = useState(new Date());
  const tasks = useSelector((state: RootState) => state.tasks);
  const players = useSelector((state: RootState) => state.players);

  useEffect(() => {
    // check current time vs tasks.tasks[0]
    // if complete, remove task [0]
    // do reward

    if (tasks.tasks.length > 0) {
      const task = tasks.tasks[0];
      const { duration } = task;

      // console.log(duration);
      // console.log(time.valueOf());

      if (time.valueOf() > duration) {
        dispatch(handleReward(task));
      }
    }

    const timer = setTimeout(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  });

  useEffect(() => {
    console.log(players);
    console.log("Rendered");
    dispatch(addExp({ playerID: 0, skill: SkillNames.Agility, expReward: 50 }));
    new Laps({ playerID: 0, name: "a", amount: 1 }).start();
    new Laps({ playerID: 1, name: "b", amount: 2 }).start();
    new Laps({ playerID: 1, name: "b", amount: 2 }).start();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const herp = TestMonster;
  // console.log(herp);

  // const loot1 = herp.getLoot(10);
  // console.log(loot1);
  // const loot2 = herp.getLoot(100);
  // console.log(loot2);

  // const y = addLootToBank(loot2);

  // console.log(derp());
  // console.log(getSkillObject());

  // console.log(skillObject);

  // console.log(player);

  // console.log(getSkillObject());

  // console.log(player.getBank());

  // player.addBankToBank(loot1);
  // player.addBankToBank(loot1);
  // player.removeBankFromBank(loot1);
  // player.addToItemBank({ item: 2048, amount: 1065764500 });
  // player.removeFromItemBank({ item: 4151, amount: 1 });
  // player.removeFromItemBank({ item: 4151, amount: 1 });
  // player.removeFromItemBank({ item: 41531, amount: 1 });
  // console.log(player.getBank());

  return (
    <div className="app" />
  );
};

export default App;
