/* eslint-disable max-len */
import { useSelector, shallowEqual } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import { RootState } from "../../redux-stuff";

import "./CharacterPanel.css";
import { NameState } from "../../model/OhGodWhy";

const CharacterPanel = (): JSX.Element => {
  const names: NameState = useSelector((state: RootState) => state.characters.names, shallowEqual);

  const MakeList = (): JSX.Element => {
    const sortedTaskData: Array<JSX.Element> = [];
    // sortedTaskData.push(<Link to="/">Home</Link>);
    Object.entries(names).forEach(([playerID, name]) => {
      sortedTaskData.push(<Link className="character-panel-item" to={`/player/${playerID}`}>{name}</Link>);
    });

    return (
      <div className="character-panel-window">
        <div className="character-panel-title">
          <Link to="/" className="home-button">Overview</Link>
        </div>
        <div className="character-panel-inner">
          {sortedTaskData}
        </div>
      </div>
    );
  };

  return (
    <MakeList />
  );
};

export default CharacterPanel;
