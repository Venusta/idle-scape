/* eslint-disable max-len */
import { useSelector, shallowEqual } from "react-redux";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { RootState } from "../../redux-stuff";

import "./Sidebar.css";
import { NameState } from "../../constants/builders/CharacterBuilder";

export const CharacterPanel = (): JSX.Element => {
  const names: NameState = useSelector((state: RootState) => state.characters.names, shallowEqual);
  const location = useLocation();

  const MakeList = () => {
    const sortedTaskData: Array<JSX.Element> = [];
    Object.entries(names).forEach(([playerID, name]) => {
      sortedTaskData.push(
        <Link
          key={playerID}
          className={`sidebar-item item-bubble selected-button ${location.pathname === `/player/${playerID}` ? "selected" : ""}`}
          to={`/player/${playerID}`}
        >
          {name}
        </Link>,
      );
    });
    return sortedTaskData;
  };

  return (
    <div className="sidebar-window">
      <Link to="/" className="sidebar-title">
        <div>Overview</div>
      </Link>
      <div className="sidebar-inner panel-inner">
        {MakeList()}
      </div>
    </div>
  );
};