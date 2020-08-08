/* eslint-disable max-len */
import { useSelector, shallowEqual } from "react-redux";
import React from "react";
import { v1 as uuid } from "uuid";
import { RootState, TaskState } from "../../redux-stuff";

import "./TaskList.css";
import { NameState } from "../../model/OhGodWhy";

const TaskList = (): JSX.Element => {
  const tasks: TaskState = useSelector((state: RootState) => state.tasks);
  const names: NameState = useSelector((state: RootState) => (state.characters.names), shallowEqual);

  const MakeList = (): JSX.Element => {
    console.log("Task list re-render");
    console.log(tasks);

    const characterData = Object.entries(tasks);
    const taskListData: Array<JSX.Element> = [];

    characterData.forEach((character) => {
      const [id, data] = character;
      data.queue.forEach((queueItem, index) => {
        let classes = "task-list-item";
        if (index === 0) {
          classes = "task-list-item task-list-active";
        }
        const { when, type, info: { name, amount = 0 } } = queueItem;
        taskListData.push(<div className={classes} key={uuid()}>{`${names[id]}: ${type} ${amount}x ${name} ${when}`}</div>);
        // console.log(`${id} ${type} ${amount}x ${name} ${when}`);
      });
    });

    return (
      <div className="task-list-window">
        <div className="task-list-title">
          <div>Task List</div>
        </div>
        <div className="task-list-inner">
          {taskListData}
          {/* {queue.map((task) => <div className="task-list-item" key={uuid()}>{`${task.when} ${task.skill} ${task.expReward}`}</div>)} */}
        </div>
      </div>
    );
  };

  return (
    <MakeList />
  );
};

export default TaskList;
