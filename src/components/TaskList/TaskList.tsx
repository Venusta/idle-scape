/* eslint-disable max-len */
import { useSelector, shallowEqual } from "react-redux";
import React from "react";
import { v1 as uuid } from "uuid";
import { RootState, TaskState, QueuedTask } from "../../redux-stuff";

import "./TaskList.css";
import { NameState } from "../../model/CharacterBuilder";

interface TaskData extends QueuedTask {
  playerName: string
  classes: string
}

const TaskList = (): JSX.Element => {
  const tasks: TaskState = useSelector((state: RootState) => state.tasks, shallowEqual);
  const names: NameState = useSelector((state: RootState) => state.characters.names, shallowEqual);

  const MakeList = (): JSX.Element => {
    console.log("Task list re-render");
    console.log(tasks);

    const characterData = Object.entries(tasks); // todo sort by when before the loop
    // const taskListData: Array<JSX.Element> = [];
    const taskData: Array<TaskData> = [];

    characterData.forEach((character) => {
      const [id, data] = character;
      data.queue.forEach((queueItem, index) => {
        let classes = "task-list-item";
        if (index === 0) {
          classes = "task-list-item task-list-active";
        }
        // const { when, type, info: { name, amount = 0 } } = queueItem;
        taskData.push({
          playerName: names[id], classes, ...queueItem,
        });
        // taskListData.push(<div className={classes} key={uuid()}>{`${names[id]}: ${type} ${amount}x ${name} ${when}`}</div>);
      });
    });

    // const sortedTaskData = taskData.sort((a, b) => a.when - b.when).map((item) => {
    //   const {
    //     playerName, type, info: { name, amount = 0 }, when, classes,
    //   } = item;
    //   return <div className={classes} key={uuid()}>{`${playerName}: ${type} ${amount}x ${name} ${when}`}</div>;
    // });

    return (
      <div className="task-list-window">
        <div className="task-list-title">
          <div>Task List</div>
        </div>
        <div className="task-list-inner">
          {/* {sortedTaskData} */}
        </div>
      </div>
    );
  };

  return (
    <MakeList />
  );
};

export default TaskList;
