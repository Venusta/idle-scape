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
import Bank from "./Bank/Bank";
import Skills from "./Skills/Skills";
import TaskTimer from "./TaskTimer/TaskTimer";
import { NameState } from "../model/CharacterBuilder";
import TaskList from "./TaskList/TaskList";
import CharacterPanel from "./CharacterPanel/CharacterPanel";
import Log from "./Log/Log";
import { newTask } from "../slices/task";
import Banks from "./Bank/Banks";

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

const App = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const help = (amount: number) => {
    const suffix: string[] = ["k", "m", "b", "t", "q"];
    let size = amount !== 0 ? Math.log10(amount) : 0;
    if (size >= 3) {
      while (size % 3 !== 0) {
        size -= 1;
      }
    }
    const fin = (size >= 3) ? `${(Math.round((amount / (10 ** size)) * 10) / 10)}${suffix[(size / 3) - 1]}` : amount;
    return fin.toString();
  };

  const help2 = (number: string) => {
    const suffix: string[] = ["", "k", "m", "b", "t", "q"];
    let size = number.length;
    console.log(`number: ${number} size: ${size}`);

    let index = 0;

    if (size >= 6) {
      while (size >= 5) {
        size -= 3;
        index += 1;
        // console.log(`size: ${size} index: ${index}`);
      }
    }
    return `${number.toString().slice(0, size)}${suffix[index]}`;
  };
  /*
  length  needTo      digitsToSlice
  5     = 10000       -0
  6     = 100k        -3
  7     = 1000k       -3
  8     = 10m         -6
  9     = 100m        -6
  10    = 1000m       -6
  11    = 10b         -9
  12    = 100b        -9
  13    = 1000b       -9

  */

  useEffect(() => {
    const tests = ["1", "999", "1000", "1001", "99999", "100000", "100001", "999999", "1000000", "1000001", "9999999", "10000000", "10000001", "100000000", "1000000000", "10000000000", "10000000001"];
    const answers = ["1", "999", "1000", "1001", "99999", "100k", "100k", "999k", "1000k", "1000k", "9999k", "10m", "10m", "100m", "1000m", "10b", "10b"];

    tests.forEach((num, index) => {
      const x = help2(num);
      const y = answers[index];

      console.log(`${x} should be: ${answers[index]} ${x === y}`);
      console.log("---------------------------------------------------");
    });

    // dispatch(newTask({
    //   playerID: "3", taskName: "chicken", taskType: "Cooking", amount: 1,
    // }));
    // dispatch(newTask({
    //   playerID: "3", taskName: "chicken", taskType: "Cooking", amount: 2,
    // }));
    // dispatch(newTask({
    //   playerID: "3", taskName: "chicken", taskType: "Cooking", amount: 3,
    // }));
    // dispatch(newTask({
    //   playerID: "3", taskName: "lobster", taskType: "Cooking", amount: 50,
    // }));
    // dispatch(newTask({
    //   playerID: "3", taskName: "chicken", taskType: "Cooking", amount: 3,
    // }));
    // dispatch(newTask({
    //   playerID: "3", taskName: "chicken", taskType: "Cooking", amount: 3,
    // }));
    // dispatch(newTask({
    //   playerID: "3", taskName: "chicken", taskType: "Cooking", amount: 3,
    // }));
    // dispatch(newTask({
    //   playerID: "3", taskName: "chicken", taskType: "Cooking", amount: 50,
    // }));
    // console.log("Rendered");

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
