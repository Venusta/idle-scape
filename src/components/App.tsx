/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import {
  Switch, Route, Redirect, useParams,
} from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";

import "./App.css";
import { RootState, useAppDispatch } from "../redux-stuff";
import { Bank } from "./Bank/Bank";
import { Skills } from "./Skills/Skills";
import { TaskTimer } from "./TaskTimer/TaskTimer";
import { NameState } from "../constants/builders/CharacterBuilder";
import { TaskList } from "./TaskList/TaskList";
import { CharacterPanel } from "./Sidebar/Sidebar";
import { Log } from "./Log/Log";
import { newTask } from "../slices/task";
import { Banks } from "./Bank/Banks";
import { Equipment } from "./Equipment/Equipment";
import { FishingTask } from "../constants/tasks/fishing";

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
      <Equipment />
      <Skills id={playerID} />
    </div>
  );
};

export const App = (): JSX.Element => {
  const dispatch = useAppDispatch();

  // const player = useSelector((state: RootState) => {
  //   return {
  //     name: state.characters.names["3"],
  //     skills: state.characters.skills["3"],
  //     equipment: state.characters.equipment["3"],
  //     bank: state.characters.banks["3"],
  //   };
  // }, shallowEqual);

  useEffect(() => {
    const x = FishingTask({ playerID: "3", taskName: "shrimp", amount: 10 });
    console.log(x);
    const y = FishingTask({ playerID: "3", taskName: "anchovies", amount: 10 });
    console.log(y);

    // nameToId("Abyssal whip");

    // const tests = ["1", "999", "1000", "1001", "99999", "100000", "100001", "999999", "1000000", "1000001", "9999999", "10000000", "10000001", "100000000", "1000000000", "10000000000", "10000000001"];
    // const answers = ["1", "999", "1000", "1001", "99999", "100k", "100k", "999k", "1000k", "1000k", "9999k", "10m", "10m", "100m", "1000m", "10b", "10b"];

    // tests.forEach((num, index) => {
    //   const x = help2(num);
    //   const y = answers[index];

    //   console.log(`${x} should be: ${answers[index]} ${x === y}`);
    //   console.log("---------------------------------------------------");
    // });

    // dispatch(newTask({
    //   playerID: "3", taskName: "chicken", taskType: "cooking", amount: 20,
    // }));
    // dispatch(newTask({
    //   playerID: "3", taskName: "salmon", taskType: "cooking", amount: 200,
    // }));
    // dispatch(newTask({
    //   playerID: "3", taskName: "lobster", taskType: "cooking", amount: 100,
    // }));
    // dispatch(newTask({
    //   playerID: "3", taskName: "lobster", taskType: "cooking", amount: 50,
    // }));

    console.log("Rendered");
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
