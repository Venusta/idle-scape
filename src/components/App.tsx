/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import {
  Switch, Route, Redirect, useParams,
} from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import {
  LineChart, XAxis, Tooltip, CartesianGrid, Line, BarChart, YAxis, Legend, Bar,
} from "recharts";
import "./App.css";
import { FishingSimulation } from "../playground/fishingCalculator";
import { RootState, useAppDispatch } from "../redux-stuff";
import { Bank } from "./Bank/Bank";
import { Skills } from "./Skills/Skills";
import { TaskTimer } from "./TaskTimer/TaskTimer";
import { NameState } from "../constants/builders/CharacterBuilder";
import { TaskList } from "./TaskList/TaskList";
import { Sidebar } from "./Sidebar/Sidebar";
import { Log } from "./Log/Log";
import { newTask, processQueue } from "../slices/task";
import { Banks } from "./Bank/Banks";
import { Equipment } from "./Equipment/Equipment";
import { combatTask } from "../constants/tasks/combat";
import { TaskSelector } from "./TaskSelector/TaskSelector";
import { testMonster } from "../drop-simulator/TestMonster";

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
    <div className="character-view-container">
      <div className="reeee">
        <TaskList />
        <Log />
        <Bank id={characterId} />
        <Equipment />
        <Skills id={characterId} />
      </div>
      <TaskSelector />
    </div>
  );
};

export const App = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // console.table(
    //   new FishingSimulation().run2(1),
    // );
    // console.table(
    //   new FishingSimulation().run2(),
    // );
    // new FishingSimulation(true).run99();

    // testMonster.kill();
    console.table(testMonster.resultToNames(50));

    // const x = fishingTask({ characterID: "3", taskName: "leaping trout", amount: 20 });
    // console.log(x);
    // const x = combatTask({ characterId: "3", taskName: "leaping trout", amount: 2000 });
    // dispatch(processQueue({ characterId: "3", task: x }));
    // const y = combatTask({ characterId: "3", taskName: "leaping trout", amount: 2000 });
    // dispatch(processQueue({ characterId: "3", task: y }));
    // const z = combatTask({ characterId: "3", taskName: "leaping trout", amount: 2000 });

    console.log("Rendered");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = [
    {
      level: "1",
      "Leaping sturgeon": 2960,
      "Leaping salmon": 5040,
      "Leaping trout": 6800,
      // Total: 14800,
    },
    {
      level: "99",
      "Leaping sturgeon": 24080,
      "Leaping salmon": 23660,
      "Leaping trout": 21050,
      // Total: 68790,
    },
  ];

  const Chart = () => (
    <LineChart
      width={800}
      height={550}
      data={data}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="level" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="Leaping sturgeon" stroke="#82ca9d" />
      <Line type="monotone" dataKey="Leaping salmon" stroke="#8884d8" />
      <Line type="monotone" dataKey="Leaping trout" stroke="#ff8fd3" />
      <Line type="monotone" dataKey="Total" stroke="#f79700" />
    </LineChart>
  );

  return (
    <div className="app">
      <TaskTimer />
      <Sidebar />
      <div className="content">
        <Switch>
          <Route exact path="/">
            <div className="reeee">
              <TaskList />
              <Log />
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
