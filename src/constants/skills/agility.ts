import { SkillNames } from "../data";
import TaskBuilder from "../../model/TaskBuilder";

const gnome = new TaskBuilder({ name: "Gnome" })

  .reqSkill(SkillNames.agility, 1)

  .rewardExp(SkillNames.agility, 20)
  .rewardExp(SkillNames.strength, 10)
  .rewardExp(SkillNames.attack, 300)

  .rewardItem(995, 150)
  .rewardItem(4151, 3)
  .rewardItem(2048)

  .finalise(10);

const barb = new TaskBuilder({ name: "Barb" })

  .reqSkill(SkillNames.agility, 1)
  .reqSkill(SkillNames.slayer, 2)

  .rewardExp(SkillNames.agility, 2000)
  .rewardExp(SkillNames.strength, 10)
  .rewardExp(SkillNames.attack, 300)

  .rewardItem(995, 150)
  .rewardItem(4151, 3)
  .rewardItem(2048)

  .finalise(20);

const courses = [
  gnome,
  barb,
];

const Agility = {
  courses,
  id: SkillNames.agility,
};

export default Agility;
