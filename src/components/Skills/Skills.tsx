/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable no-console */
import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import { v1 as uuid } from "uuid";

import "./Skills.css";
import { expToLevel } from "../../util";
import { RootState } from "../../redux-stuff";
import { CharacterSkills, CharacterSkill } from "../../types/types";
import { selectSkills, selectName } from "../../selectors";

interface ItemProps {
  skillName: string;
  exp: number;
}

export const Skill: React.FC<ItemProps> = ({ skillName, exp }) => {
  const handleClick = () => {
    console.log(`Clicked ${skillName}`);
    // if (skillName === "agility") {
    //   new Laps({ playerID: "3", name: "a", amount: 1 }).start();
    // }
  };
  return (
    <div
      className="character-skill"
      title={`${skillName} Click me!`}
      onClick={() => handleClick()}
    >
      <div className="skill-exp">{`${skillName}: ${expToLevel(exp)} exp: ${exp} `}</div>
    </div>
  );
};

interface SkillsProps {
  id: string;
}

export const Skills = ({ id }: SkillsProps): JSX.Element => {
  const characterData: { name: string, skills: CharacterSkills } = useSelector((state: RootState) => ({
    name: selectName(state, id),
    skills: selectSkills(state, id),
  }), shallowEqual);

  const { name, skills } = characterData;

  const renderSkill = (skillName: string, exp: number): JSX.Element => (
    <Skill
      key={`skills-${uuid()}`}
      skillName={skillName}
      exp={exp}
    />
  );

  const renderSkills = (): JSX.Element[] => {
    console.log(`${name} Skills Rendered`);
    return Object.entries(skills).map(([key, { exp }]: [string, CharacterSkill]) => renderSkill(key, exp));
  };

  return (
    <div className="skill-window panel-window">
      <div className="panel-title">
        <div>{`${name}'s Stats`}</div>
      </div>
      <ul className="skill-inner">
        {renderSkills()}
      </ul>
    </div>
  );
};
