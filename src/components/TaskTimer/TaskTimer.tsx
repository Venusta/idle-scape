/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { v1 as uuid } from "uuid";
import { RootState, handleReward, useAppDispatch } from "../../redux-stuff";

const TaskTimer = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [time, setTime] = useState(new Date());
  const queue = useSelector((state: RootState) => state.tasks.queue);

  const MakeList = (): JSX.Element => (
    <div>
      {queue.map((task) => <div key={uuid()}>{`${task.when} ${task.skill} ${task.expReward}`}</div>)}
    </div>
  );

  useEffect(() => { // todo maybe make this outside of react
    console.log("Tick!");

    if (queue.length > 0) {
      const task = queue[0];
      const { when } = task;

      if (time.valueOf() > when) {
        dispatch(handleReward(task));
      }
    }

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
