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

const SingleCharacterView = () => {
  const ids: NameState = useSelector((state: RootState) => state.characters.names, shallowEqual);
  const { characterId } = useParams<{characterId: string}>();

  if (ids[characterId] === undefined) {
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
      <Bank id={characterId} />
      <Equipment />
      <Skills id={characterId} />
    </div>
  );
};

export const App = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // const x = fishingTask({ characterID: "3", taskName: "leaping trout", amount: 20 });
    // console.log(x);

    dispatch(newTask({
      characterId: "3", taskName: "leaping trout", taskType: "fishing", amount: 20,
    }));

    dispatch(newTask({
      characterId: "3", taskName: "chicken", taskType: "cooking", amount: 20,
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
          <Route path="/character/:characterId">
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
