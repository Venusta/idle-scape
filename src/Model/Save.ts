import { PlayerOptions } from "../types/types";
import { skillsSaveObject } from "../constants/data";

const makePlayer = ({
  id, name, skills, equipment,
}: PlayerOptions) => {
  const skills2 = skillsSaveObject;
  console.log("");
  console.log("");
  return { id, name };
};

const InitialSave = () => {
  const test = [
    {
      id: 0,
      name: "",
    },
  ];

  return [];
};
