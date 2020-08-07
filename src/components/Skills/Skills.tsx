/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable no-console */
import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import { v1 as uuid } from "uuid";

import "./Skills.css";
import Laps from "../../constants/tasks/laps";
import { expToLevel } from "../../util";
import { RootState } from "../../redux-stuff";
import { SkillsStats, SkillStats } from "../../types/types";

interface ItemProps {
  skillName: string;
  exp: number;
}

const Skill: React.FC<ItemProps> = ({ skillName, exp }) => {
  const handleClick = () => {
    console.log(`Clicked ${skillName}`);
    if (skillName === "agility") {
      new Laps({ playerID: "3", name: "a", amount: 15 }).start();
    }
  };
  return (
    <div
      className="player-skill"
      title={`${skillName} Click me!`}
      onClick={() => handleClick()}
    >
      <div className="skill-exp">{`${skillName}: ${expToLevel(exp)} exp: ${exp} `}</div>
    </div>
  );
};

const Skills = (): JSX.Element => {
  const playerData: {name: string, skills: SkillsStats } = useSelector((state: RootState) => ({
    name: state.characters.names["3"], // TODO MULTICHARACTER SKILLS
    skills: state.characters.skills["3"],
  }), shallowEqual);

  const { name, skills } = playerData;

  const renderSkill = (skillName: string, exp: number): JSX.Element => (
    <Skill
      key={`skills-${uuid()}`}
      skillName={skillName}
      exp={exp}
    />
  );

  const renderSkills = (): JSX.Element[] => { // todo fix
    console.log(`${name} Skills Rendered`);

    const itemCount = Object.keys(skills).length;
    const skillDivs = [];

    for (let index = 0; index < itemCount; index += 1) {
      const skillName: string = Object.keys(skills)[index];
      const data: SkillStats = skills[skillName as keyof SkillsStats];
      const { exp } = data;

      skillDivs.push(renderSkill(skillName, exp));
    }
    return skillDivs;
  };

  return (
    <div className="skill-window">
      <div className="skill-title">
        <div>{`${name}'s Stats`}</div>
      </div>
      <ul className="skill-inner">
        {renderSkills()}
      </ul>
    </div>
  );
};

export default Skills;
