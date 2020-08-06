/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";

import "./App.css";
import { RootState, useAppDispatch } from "../redux-stuff";
import { createItemSlots } from "../constants/data";
import Laps from "../constants/player/laps";
import CombatSimulator from "../model/CombatSimulator";
import Equipment from "../model/Equipment";

import Bank from "./Bank/Bank";
import Skills from "./Skills/Skills";
import TaskTimer from "./TaskTimer/TaskTimer";
import charactersInitialState, { ItemBankState, NameState } from "../model/OhGodWhy";

// const selectBanks = createSelector(
//   (state: RootState) => state.players.banks,
//   // (banks) => Object.keys(banks).map((key) => banks[key]),
//   (banks) => banks,
// );
// const selectNames = createSelector(
//   (state: RootState) => state.players.names,
//   (names) => names,
// );

interface PlayerBanksData {
  banks: ItemBankState,
  names: NameState,
}

const Banks = () => { // todo extract component
  const playerData: PlayerBanksData = useSelector((state: RootState) => ({
    names: state.characters.names,
    banks: state.characters.banks,
  }), shallowEqual);
  const { names, banks } = playerData;

  console.log("Don't re-render me!");

  return (
    <div>
      {Object.keys(banks).map((id) => <Bank key={id} bank={banks[id]} name={names[id]} />)}
    </div>
  );
};

const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("Rendered");
    console.log(charactersInitialState({}));

    // dispatch(changeName({ playerID: 0, newName: "FUCK" }));
    // dispatch(addExp({ playerID: "3", skill: SkillNames.agility, expReward: 50 }));
    // dispatch(addExp({ playerID: "3", skill: SkillNames.agility, expReward: 50 }));
    // new Laps({ playerID: "3", name: "a", amount: 2 }).start();
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
      <TaskTimer />
      <Banks />
      <Skills />
    </div>
  );
};

export default App;
