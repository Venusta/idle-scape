import { SkillNames } from "../data";

const courses = [
  {
    name: "a",
    requirements: {
      [SkillNames.agility]: 1,
    },
    exp: 80,
    lapTime: 30,
  },
  {
    name: "b",
    requirements: {
      [SkillNames.agility]: 2,
    },
    exp: 30,
    lapTime: 40,
  },
  {
    name: "c",
    requirements: {
      [SkillNames.agility]: 3,
    },
    exp: 40,
    lapTime: 50,
  },
];

const Agility = {
  courses,
  id: SkillNames.agility,
};

export default Agility;
