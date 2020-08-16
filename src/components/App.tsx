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
  useEffect(() => {
    dispatch(newTask({
      playerID: "3", taskName: "chicken", taskType: "Cooking", amount: 1,
    }));
    dispatch(newTask({
      playerID: "3", taskName: "chicken", taskType: "Cooking", amount: 2,
    }));
    dispatch(newTask({
      playerID: "3", taskName: "chicken", taskType: "Cooking", amount: 3,
    }));
    dispatch(newTask({
      playerID: "3", taskName: "lobster", taskType: "Cooking", amount: 50,
    }));
    dispatch(newTask({
      playerID: "3", taskName: "chicken", taskType: "Cooking", amount: 3,
    }));
    dispatch(newTask({
      playerID: "3", taskName: "chicken", taskType: "Cooking", amount: 3,
    }));
    dispatch(newTask({
      playerID: "3", taskName: "chicken", taskType: "Cooking", amount: 3,
    }));
    dispatch(newTask({
      playerID: "3", taskName: "chicken", taskType: "Cooking", amount: 50,
    }));
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

export default App;
