/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import {
  Switch, Route, Redirect, useParams,
} from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";

import "./App.css";
import { SkillNames } from "../constants/data";
import TaskBuilder from "../model/TaskBuilder";
import { RootState, useAppDispatch } from "../redux-stuff";
import CombatSimulator from "../model/CombatSimulator";
import Equipment from "../model/Equipment";

import Bank from "./Bank/Bank";
import Skills from "./Skills/Skills";
import TaskTimer from "./TaskTimer/TaskTimer";
import { NameState } from "../model/CharacterBuilder";
import TaskList from "./TaskList/TaskList";
import { AttackStyle, EquipmentSlotNames } from "../types/types";
import CharacterPanel from "./CharacterPanel/CharacterPanel";
import Log from "./Log/Log";
import Requirements from "../constants/tasks/Requirements";
import RewardBuilder from "../model/RewardBuilder";
import Laps from "../constants/tasks/laps";
import CookingTask from "../constants/tasks/cooking";

// const selectBanks = createSelector(
//   (state: RootState) => state.players.banks,
//   // (banks) => Object.keys(banks).map((key) => banks[key]),
//   (banks) => banks,
// );
// const selectNames = createSelector(
//   (state: RootState) => state.players.names,
//   (names) => names,
// );

interface MatchParams {
  playerID: string;
}

const Banks = () => { // todo extract component
  const ids: NameState = useSelector((state: RootState) => state.characters.names, shallowEqual);
  console.log("Don't re-render me!");

  return (
    <div>
      {Object.keys(ids).map((id) => <Bank key={id} id={id} />)}
    </div>
  );
};

const SingleCharacterView = () => {
  const ids: NameState = useSelector((state: RootState) => state.characters.names, shallowEqual);
  const { playerID } = useParams<{playerID: string}>();

  if (ids[playerID] === undefined) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }

  return (
    <div className="reeee">
      <TaskList />
      <Bank id={playerID} />
      <Skills id={playerID} />
    </div>
  );
};

const tasksExample = {
  playerID3: {
    queue: [
      {
        playerID: "playerID3",
        when: 348907534,
        duration: 300,
        type: "AgilityLaps",
        info: {
          name: "Gnome",
          laps: 300,
        },
        reward: {
          exp: {
            agility: 20,
            strength: 30,
          },
          items: {
            4151: 20,
            995: 300,
          },
        },
      },
      {
        playerID: "playerID3",
        when: 348907534,
        duration: 900,
        type: "SlayerTask",
        info: {
          name: "Chicken",
          amount: 200,
        },
        reward: {
          exp: {
            agility: 20,
            strength: 30,
          },
          items: {
            4151: 20,
            995: 300,
          },
        },
      },
    ],
  },
  playerID9: {
    queue: [
      {
        playerID: "playerID9",
        when: 348907534,
        duration: 100,
        type: "AgilityLaps",
        info: {
          name: "Roof",
          laps: 400,
        },
        reward: {
          exp: {
            agility: 20,
            strength: 30,
          },
          items: {
            4151: 20,
            995: 300,
          },
        },
      },
      {
        playerID: "playerID9",
        when: 348907534,
        duration: 1000,
        type: "SlayerTask",
        info: {
          name: "Goblin",
          amount: 100,
        },
        reward: {
          exp: {
            agility: 20,
            strength: 30,
          },
          items: {
            4151: 20,
            995: 300,
          },
        },
      },
    ],
  },
};

const App = (): JSX.Element => {
  useEffect(() => {
    console.log("Rendered");
    // console.log(charactersInitialState({}));

    // new Laps({ playerID: "3", name: "Barb", amount: 1 }).start();
    // new Laps({ playerID: "3", name: "Gnome", amount: 2 }).start();
    new CookingTask({ playerID: "3", taskName: "Raw Chicken", amount: 10 }).start();
    new CookingTask({ playerID: "3", taskName: "Raw Chicken", amount: 10 }).start();
    new CookingTask({ playerID: "3", taskName: "Raw Chicken", amount: 10 }).start();
    new CookingTask({ playerID: "3", taskName: "Raw Chicken", amount: 10 }).start();
    new CookingTask({ playerID: "3", taskName: "Raw Chicken", amount: 10 }).start();
    new CookingTask({ playerID: "3", taskName: "Raw Chicken", amount: 10 }).start();
    new CookingTask({ playerID: "3", taskName: "Raw Chicken", amount: 10 }).start();
    new CookingTask({ playerID: "3", taskName: "Raw Chicken", amount: 10 }).start();
    new CookingTask({ playerID: "3", taskName: "Raw Chicken", amount: 10 }).start();
    new CookingTask({ playerID: "3", taskName: "Raw Chicken", amount: 10 }).start();
    new CookingTask({ playerID: "3", taskName: "Raw Chicken", amount: 10 }).start();
    new CookingTask({ playerID: "3", taskName: "Raw Chicken", amount: 10 }).start();
    new CookingTask({ playerID: "3", taskName: "Raw Chicken", amount: 10 }).start();
    new CookingTask({ playerID: "3", taskName: "Raw Chicken", amount: 10 }).start();

    // new CookingTask({ playerID: "3", taskName: "Raw Chicken", amount: 20 }).start();
    // new CookingTask({ playerID: "3", taskName: "Raw Chicken", amount: 20 }).start();
    // new CookingTask({ playerID: "3", taskName: "Raw Chicken", amount: 10 }).start();
    // new CookingTask({ playerID: "3", taskName: "Raw Chicken", amount: 10 }).start();
    // new Laps({ playerID: "3", name: "Gnome", amount: 5 }).start();
    // new Laps({ playerID: "3", name: "Gnome", amount: 10 }).start();
    // new Laps({ playerID: "3", name: "Gnome", amount: 1 }).start();

    const task = new TaskBuilder({ name: "Gnome" })

      .reqSkill(SkillNames.agility, 1)
      .reqSkill(SkillNames.slayer, 2)
      .reqSkill(SkillNames.runecrafting, 2)

      .reqItem(995, 150)

      .reqEquip(EquipmentSlotNames.weapon, 4151)
      .reqEquip(EquipmentSlotNames.head, 4151)

      .rewardExp(SkillNames.agility, 20)
      .rewardExp(SkillNames.strength, 10)
      .rewardExp(SkillNames.attack, 300)

      .rewardItem(995, 150)
      .rewardItem(4151, 3)
      .rewardItem(2048)

      .finalise(30);

    // console.log(task);

    // const doesCharacter = new Requirements("3", task.requirements);
    // console.log(doesCharacter.haveReqs());

    // const rewards = new RewardBuilder(task.rewards).amount(20);
    // console.log(rewards);

    // const simulator = new CombatSimulator(0, "3", 1800, AttackStyle.controlled, {});
    // simulator.simulate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      <CharacterPanel />
      <TaskTimer />
      <div className="content">
        <Switch>
          <Route exact path="/">
            <div className="something">
              <Log />
              <TaskList />
              <Banks />
            </div>
          </Route>
          <Route path="/player/:playerID">
            <SingleCharacterView />
          </Route>
          <Route>
            <h1>404 Not Found</h1>
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default App;
