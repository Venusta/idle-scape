/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSelector, shallowEqual } from "react-redux";
import React, { useState, useEffect } from "react";
import { v1 as uuid } from "uuid";
import { RootState, useAppDispatch } from "../../redux-stuff";
import { TaskState, processQueue, handleActiveTask } from "../../slices/task";
import { cookingTask } from "../../constants/tasks/cooking";
import { fishingTask } from "../../constants/tasks/fishing";

export const TaskTimer = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [time, setTime] = useState(new Date());
  const tasks: TaskState = useSelector((state: RootState) => state.tasks, shallowEqual);

  const handleTask = () => {
    const characterIds = Object.keys(tasks);

    characterIds.forEach((characterId) => {
      const { queue, active } = tasks[characterId];

      if (queue.length > 0 && active === false) {
        const task = queue[0];
        const { taskType } = task;
        console.log(taskType);

        /* // TODO
         * switch statement here for the task type
        */
        switch (taskType) {
          case "cooking": {
            dispatch(processQueue({ playerID: characterId, task: cookingTask(task) }));
            break;
          }
          case "fishing": {
            dispatch(processQueue({ playerID: characterId, task: fishingTask(task) }));
            break;
          }
          default:
            console.log(`No tasktype found: ${taskType}`);
        }
        console.log("This should only happen once per task");
      }

      const task = tasks[characterId].activeTask;
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
