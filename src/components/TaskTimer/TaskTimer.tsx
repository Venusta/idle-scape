import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { RootState, handleReward, useAppDispatch } from "../../redux-stuff";

const TaskTimer = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [time, setTime] = useState(new Date());
  const tasks = useSelector((state: RootState) => state.tasks);

  useEffect(() => { // todo i think this has to be external
    console.log("Tick!");

    if (tasks.tasks.length > 0) {
      const task = tasks.tasks[0];
      const { duration } = task;

      if (time.valueOf() > duration) {
        dispatch(handleReward(task));
      }
    }

    const timer = setTimeout(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }); // todo fix why is this making bank render every time

  return (<div />);
};

export default TaskTimer;
