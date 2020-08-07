/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { v1 as uuid } from "uuid";
import { RootState, handleReward, useAppDispatch, NewQueuePayload } from "../../redux-stuff";
import "./TaskTimer.css";

const TaskTimer = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [time, setTime] = useState(new Date());
  const tasks2 = useSelector((state: RootState) => state.tasks);

  const MakeList = (): JSX.Element => (
    <div className="task-list-window">
      <div className="task-list-title">
        <div>Task List</div>
      </div>
      <div className="task-list-inner">
        {/* {queue.map((task) => <div className="task-list-item" key={uuid()}>{`${task.when} ${task.skill} ${task.expReward}`}</div>)} */}
      </div>
    </div>
  );

  const handleTask = (tasks: {[characterID: string]:{ queue: Array<NewQueuePayload>} }) => { // todo migrate to this
    const characterIds = Object.keys(tasks);
    // console.log(characterIds);
    characterIds.forEach((character) => {
      const { queue } = tasks[character];
      // console.log(queue.length);
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

    // if (queue.length > 0) {
    //   const task = queue[0];
    //   const { when } = task;
    //   // todo change to duration so we can re-calculate the "when", when you change the list order

    //   if (time.valueOf() > when) {
    //     dispatch(handleReward(task));
    //   }
    // }
    handleTask(tasks2);

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
