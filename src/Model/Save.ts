import skills from "./Skills";

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
      skills: skills(),
    },
  ];

  return [];
};

const playerSave = {
  skills: skills(),
};

export const save = (thingToSave: string): void => {
  localStorage.setItem("testSave", JSON.stringify(thingToSave));
};

export const loadSave = () => {
  const test = localStorage.getItem("testSave");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  if (test) { return JSON.parse(test); }
};

export const wipeSave = () => {
  localStorage.removeItem("testSave");
};
