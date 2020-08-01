import { Player } from "../types/types";
import player from "./Player";
import { initialSkills } from "./Skills";

// eslint-disable-next-line object-curly-newline
// const loadPlayer = ({ id, name, equipment }: PlayerOptions) => {
//   const skills2 = skillsSaveObject;
//   console.log("");
//   console.log("");
//   return { id, name };
// };

const InitialSave = () => {
  const test = [
    {
      id: 0,
      name: "",
      skills: initialSkills,
    },
  ];

  return [];
};

const playerSave = {
  skills: initialSkills,
};

export const save = (thingToSave: Player[]): void => {
  localStorage.setItem("testSave", JSON.stringify(thingToSave));
};

export const loadSave = (): Player[] => {
  const test = localStorage.getItem("testSave");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  if (test) { return JSON.parse(test); }
  return [
    player({ id: 0, name: "yeetus" }),
  ];
};

export const wipeSave = () => {
  localStorage.removeItem("testSave");
};
