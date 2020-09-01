/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-implied-eval */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from "react";
import "./TaskSelector.css";
import { useDispatch } from "react-redux";
import { getIcon } from "../../model/Icon";
import { QueuedTask, newTask } from "../../slices/task";

interface TaskMenuItemProps {
  name: string;
  icon: number;
  task?: QueuedTask
}

interface TaskMenuProps {
  title?: string;
  children?: Array<React.ReactElement<TaskMenuProps>>;
}

const TaskMenuItem = ({ name, icon, task }: TaskMenuItemProps) => {
  const dispatch = useDispatch();
  // todo don't actually dispatch the task, just select it.
  // todo amount box at top auto fills with max.
  // todo search box
  // todo way to confirm dispatch, a button?
  const ahhh = task || {
    characterId: "3", taskName: "leaping trout", taskType: "fishing", amount: 20,
  };
  return (
    <div className="task-menu-item" onClick={() => dispatch(newTask(ahhh))}>
      <img
        className="itemImage2"
        width="18"
        height="16"
        src={`data:image/png;base64, ${getIcon(icon)}`}
      />
      <span className="task-menu-item-name">{name}</span>
    </div>
  );
};

const TaskMenu = ({ title, children }: TaskMenuProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const taskMenuItemClassName = collapsed
    ? "task-menu-children collapsed"
    : "task-menu-children";

  return (
    <div>
      <div className="task-menu-name" onClick={() => setCollapsed(!collapsed)}>
        {title}
      </div>
      <div className={taskMenuItemClassName}>
        {children}
      </div>
    </div>
  );
};

export const TaskSelector = (): JSX.Element => {
  // todo auto-populate from task data

  return (
    <div className="task-selector panel-window">
      <div className="title-container panel-title">
        <div>Task Selector</div>
        <input type="checkbox" className="checkbox-ahh" />
      </div>
      <div className="search-container">
        <div className="task-selector-search-box">Search box</div>
        <div className="task-selector-amount">300</div>
      </div>
      <div className="task-selector-inner">
        <TaskMenu title="Fishing">
          <TaskMenuItem
            icon={2138}
            name="leaping trout"
            task={{
              characterId: "3", taskName: "leaping trout", taskType: "fishing", amount: 20,
            }}
          />
          <TaskMenuItem icon={2138} name="1" />
          <TaskMenuItem icon={2138} name="2" />
        </TaskMenu>
        <TaskMenu title="Agility">
          <TaskMenuItem icon={2138} name="Gnome" />
          <TaskMenuItem icon={2138} name="1" />
          <TaskMenuItem icon={2138} name="2" />
        </TaskMenu>
        <TaskMenu title="Cooking">
          <TaskMenuItem icon={2138} name="Chicken" />
          <TaskMenuItem icon={2138} name="3" />
          <TaskMenuItem icon={2138} name="4" />
          <TaskMenuItem icon={2138} name="4" />
          <TaskMenuItem icon={2138} name="4" />
          <TaskMenuItem icon={2138} name="4" />
          <TaskMenu title="Cooking Submenu">
            <TaskMenuItem icon={2138} name="Chicken" />
            <TaskMenuItem icon={2138} name="3" />
            <TaskMenuItem icon={2138} name="4" />
          </TaskMenu>
          <TaskMenu title="Cooking Submenu2">
            <TaskMenuItem icon={2138} name="Chicken" />
            <TaskMenuItem icon={2138} name="3" />
            <TaskMenuItem icon={2138} name="4" />
          </TaskMenu>
        </TaskMenu>
      </div>
    </div>
  );
};
