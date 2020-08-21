/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSelector, shallowEqual } from "react-redux";
import React, { useState, useEffect } from "react";
import { v1 as uuid } from "uuid";
import { RootState, useAppDispatch } from "../../redux-stuff";
import { TaskState, processQueue, handleActiveTask } from "../../slices/task";
import { CookingTask } from "../../constants/tasks/cooking";

export const TaskTimer = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [time, setTime] = useState(new Date());
  const tasks: TaskState = useSelector((state: RootState) => state.tasks, shallowEqual);

  const handleTask = () => {
    const characterIds = Object.keys(tasks);

    characterIds.forEach((characterID) => {
      const { queue, active } = tasks[characterID];

      if (queue.length > 0 && active === false) {
        const task = queue[0];
        const { playerID, taskName, amount } = task;
        /* // TODO
         * switch statement here for the task type
        */
        // const x = new CookingTask(player, { playerID, taskName, amount }).start();
        const x = CookingTask({ playerID, taskName, amount });

        dispatch(processQueue({ playerID: characterID, task: x }));
        console.log("This should only happen once per task");
      }

      const task = tasks[characterID].activeTask;
      if (active && task) {
        const { when } = task;

        if (time.valueOf() > when) {
          console.log("TASK COMPLETE!!!!!!!!");
          dispatch(handleActiveTask(task));
        }
      }
    });
  };

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
