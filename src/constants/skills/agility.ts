import { SkillNames } from "../data";
import { EquipmentSlotNames } from "../../types/types";

const courses = [
  {
    name: "a",
    requirements: {
      skills: {
        [SkillNames.agility]: 1,
        // [SkillNames.slayer]: 2,
        // [SkillNames.runecrafting]: 2,
      },
      equipment: {
        [EquipmentSlotNames.weapon]: 4151,
        // [EquipmentSlotNames.head]: 2618,
      },
      items: [
        { item: 995, amount: 100 },
      ],
    },
    reward: {
      exp: {
        agility: 20,
        strength: 10,
      },
      items: [
        { item: 4151, amount: 1 },
        { item: 995, amount: 120 },
      ],
    },
    duration: 30,
  },
  // {
  //   name: "b",
  //   requirements: {
  //     [SkillNames.agility]: 2,
  //   },
  //   exp: 30,
  //   lapTime: 40,
  // },
  // {
  //   name: "c",
  //   requirements: {
  //     [SkillNames.agility]: 3,
  //   },
  //   exp: 40,
  //   lapTime: 50,
  // },
];

const Agility = {
  courses,
  id: SkillNames.agility,
};

export default Agility;
