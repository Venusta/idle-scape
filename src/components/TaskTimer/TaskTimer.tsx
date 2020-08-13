/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { v1 as uuid } from "uuid";
import {
  RootState, handleReward, useAppDispatch, TaskState,
} from "../../redux-stuff";

const TaskTimer = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [time, setTime] = useState(new Date());
  const tasks: TaskState = useSelector((state: RootState) => state.tasks);

  const handleTask = () => {
    const characterIds = Object.keys(tasks);

    characterIds.forEach((character) => {
      const { queue } = tasks[character];
      if (queue.length > 0) {
        const task = queue[0]; // todo calc task now??
        const { when } = task;
        if (time.valueOf() > when) {
          console.log(task);
          dispatch(handleReward(task));
        }
      }
    });
  };

  /* Option 1
    Click UI >
    dispatch(newTaskReducer({ playerID: 3, amount: 50, type: "Cooking" task: "Raw_Chicken" }))
    saga to watch for dispatch and delete the items?

    newTaskReducer (state, payload) => {
      switch(type) {
        Cooking: {
          new CookingTask({ playerID, amount, task }).preliminary(); // info for the ui & items to remove etc
          estimate "when"?
        }
        Melee: {
          new MeleeTask({ playerID, amount, task })
        }
      }
    }

    Timer > every 1 sec
    {
      if (task[0].rewards === undefined) { // to update .rewards need to dispatch an action
        ; // calc "reward" (xp / items) actual "when"?
        new CookingTask({ playerID, amount, task }).calculateReward();
      }
    }

  */

  /*
    Deploy an action (cook 50 raw chicken) and send it to the task list
    Calculate the "when"
    UI needs to know the "playerID", "when", "action", possibly "duration"

    tasks.queue [
      { action: "raw chicken", amount: 50, skill: cook } // this is one action
      { action: "raw shrimp", amount: 50, skill: cook }
    ]

    dispatch(tasks.queue[0]); // actually calculate the task here

  */

  useEffect(() => { // todo maybe make this outside of react
    console.log("Tick!");
    handleTask();

    const timer = setTimeout(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <div />
  );
};

export default TaskTimer;
