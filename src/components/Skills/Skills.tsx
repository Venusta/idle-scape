/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable no-console */
import React from "react";
import { useSelector } from "react-redux";

import "./Skills.css";
import { getRandomInt, expToLevel } from "../../util";
import { RootState } from "../../redux-stuff";
import { Player } from "../../types/types";

interface ItemProps {
  skillID: number;
  exp: number;
}

const Skill: React.FC<ItemProps> = ({ skillID, exp }) => (
  <li
    className="player-skill"
    title={`${skillID}`}
  >
    <div className="skill-exp">{`Exp: ${exp}`}</div>
    <div className="skill-exp">{`Level: ${expToLevel(exp)}`}</div>
  </li>
);

const Skills = (): JSX.Element => {
  const playerData: Player = useSelector((state: RootState) => state.players[0]); // TODO multi player
  const { name, skills } = playerData;

  const renderSkill = (skillID: number, exp: number) => (
    <Skill
      key={`stat-${skillID}-${getRandomInt(0, 10000000)}`} // TODO remove random number
      skillID={skillID}
      exp={exp}
    />
  );

  const renderSkills = () => { // todo fix
    console.log(`${name} Skills Rendered`);

    const itemCount = Object.keys(skills).length;
    const skillDivs = [];

    for (let row = 0; row < itemCount; row += 1) {
      const stats = Object.entries(skills)[row];
      const [id, data] = stats;
      const { exp } = data;

      skillDivs.push(renderSkill(parseInt(id, 10), exp));
    }
    return skillDivs;
  };

  return (
    <div className="skill-window">
      <div className="skill-title">
        <span>{`${name}'s Stats`}</span>
      </div>
      <ul className="skill-inner">
        {renderSkills()}
      </ul>
    </div>
  );
};

export default Skills;
