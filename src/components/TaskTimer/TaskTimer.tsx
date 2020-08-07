/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { v1 as uuid } from "uuid";
import {
  RootState, handleReward, useAppDispatch, TaskState,
} from "../../redux-stuff";
import "./TaskTimer.css";

const TaskTimer = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [time, setTime] = useState(new Date());
  const tasks: TaskState = useSelector((state: RootState) => state.tasks);

  const MakeList = (): JSX.Element => (
    <div className="task-list-window">
      <div className="task-list-title">
        <div>Task List</div>
      </div>
      <div className="task-list-inner">
        {/* {queue.map((task) => <div className="task-list-item" key={uuid()}>{`${task.when} ${task.skill} ${task.expReward}`}</div>)} */}
      </div>
    </div>
  ); // TODO fix this to render all queues

  const handleTask = () => {
    const characterIds = Object.keys(tasks);

    characterIds.forEach((character) => {
      const { queue } = tasks[character];
      if (queue.length > 0) {
        const task = queue[0];
        const { when } = task;
        if (time.valueOf() > when) {
          dispatch(handleReward(task));
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
    <MakeList />
  );
};

export default TaskTimer;
