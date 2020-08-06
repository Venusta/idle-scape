/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import {
  shallowEqual, useDispatch, useSelector, connect, useStore,
} from "react-redux";
// import Bank from "./Bank/Bank";

import "./App.css";
import { createSelector } from "@reduxjs/toolkit";
import {
  SkillsStats, AttackStyle, Player, ItemBank,
} from "../types/types";
import store, { handleReward, RootState, addExp } from "../redux-stuff";
import { createItemSlots, SkillNames } from "../constants/data";
import Laps from "../constants/player/laps";
import CombatSimulator from "../model/CombatSimulator";
import { save, loadSave } from "../model/Save";
import Equipment from "../model/Equipment";

import Bank from "./Bank/Bank";
import Skills from "./Skills/Skills";
import TaskTimer from "./TaskTimer/TaskTimer";

const useBankFromPlayer = (id: number) => { // this can't be called in a loop
  const bankData = useSelector((state: RootState) => ({
    bank: state.players[id].bank,
    name: state.players[id].name,
  }), shallowEqual);
  return bankData;
};

const selectBanks = createSelector(
  (state: RootState) => state.players,
  (players) => players.map((singlePlayer) => singlePlayer.bank),
);
const selectNames = createSelector(
  (state: RootState) => state.players,
  (players) => players.map((singlePlayer) => singlePlayer.name),
);

function toSubItem(id: number, bank: ItemBank) {
  return { id, bank };
}

const attempt9 = createSelector(
  (state: RootState) => state.players,
  (players) => {
    return players.map((singlePlayer) => toSubItem(singlePlayer.id, singlePlayer.bank));
  },
);

const test = createSelector(
  [selectBanks, selectNames],
  (banks, names) => {
    return ({ banks, names });
  },
);

const Banks = () => { // todo extract component
  const banks = useSelector(selectBanks, shallowEqual);
  const names = useSelector(selectNames, shallowEqual);

  console.log("Don't re-render me!");

  return (
    <div>
      {banks.map((bank, index) => <Bank name={names[index]} bank={bank} />)}
    </div>
  );
};

// const mapStateToProps = (state: RootState) => {
//   return {
//     names: state.players.map((sPlayer) => sPlayer.name),
//     banks: state.players.map((sPlayer) => sPlayer.bank),
//   };
// };

// const Idk = connect(mapStateToProps)(Banks);

const App = (): JSX.Element => {
  console.log("whyyyyyy???????");

  useEffect(() => {
    console.log("Rendered");
    // dispatch(addExp({ playerID: 0, skill: SkillNames.agility, expReward: 50 }));
    // dispatch(addExp({ playerID: 0, skill: SkillNames.agility, expReward: 50 }));
    new Laps({ playerID: 0, name: "a", amount: 1 }).start();
    // new Laps({ playerID: 1, name: "a", amount: 1 }).start();
    // new Laps({ playerID: 1, name: "b", amount: 2 }).start();
    // new Laps({ playerID: 1, name: "b", amount: 2 }).start();

    // const simulator = new CombatSimulator(0, 0, 600, AttackStyle.aggressive, {});

    // const playerCombatStats = {
    //   attack: { level: players[0].skills.attack.level, boost: 8 },
    //   defence: { level: players[0].skills.defence.level },
    //   strength: { level: players[0].skills.strength.level },
    //   hitpoints: { level: players[0].skills.hitpoints.level },
    //   ranged: { level: players[0].skills.ranged.level },
    //   magic: { level: players[0].skills.magic.level, boost: 5 },
    // };

    // simulator.calculateEffectiveLevels2(monsterCombatStats, 1);
    // simulator.calculateEffectiveLevelsPlayer(playerCombatStats);

    // simulator.simulate();

    console.log("blabla");
    console.log(createItemSlots());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      <Banks />
      {/* <Bank props={useBankFromPlayer(0)} />
      <Bank props={useBankFromPlayer(1)} /> */}
      <Skills />
      <TaskTimer />
    </div>
  );
};

export default App;
