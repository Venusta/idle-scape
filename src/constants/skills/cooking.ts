import { SkillNames } from "../data";
import CookingTaskBuilder from "../../model/CookingTaskBuilder";

const rawChicken = new CookingTaskBuilder({ name: "Raw Chicken" })

  .reqSkill(SkillNames.cooking, 1)

  .rewardExp(SkillNames.cooking, 30)

  .reqItem(2138)
  .rewardItem(2140)
  .failItem(2144)

  .stopBurn(24)

  .finalise(10);

const lobster = new CookingTaskBuilder({ name: "Raw Lobster" })

  .reqSkill(SkillNames.cooking, 40)

  .rewardExp(SkillNames.cooking, 90)

  .reqItem(2138)
  .rewardItem(2140)
  .failItem(2144)

  .stopBurn(74)
  .gauntlets(64)

  .finalise(10);

const cookables = [
  rawChicken,
  lobster,
];

const Cooking = {
  cookables,
  id: SkillNames.cooking,
};

export default Cooking;
