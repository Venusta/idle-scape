import { SkillNames } from "../data";
import CookingTaskBuilder from "../../model/CookingTaskBuilder";
import nameToId from "../../util/nameToId";

const chicken = new CookingTaskBuilder({ name: "chicken" })
  .reqSkill(SkillNames.cooking, 1)
  .rewardExp(SkillNames.cooking, 30)
  .reqItem(nameToId("Raw chicken"))
  .rewardItem(nameToId("Cooked chicken"))
  .failItem(nameToId("Burnt chicken"))
  .stopBurn(24)
  .finalise();

const lobster = new CookingTaskBuilder({ name: "lobster" })
  .reqSkill(SkillNames.cooking, 5)
  .rewardExp(SkillNames.cooking, 90)
  .reqItem(nameToId("Raw lobster"))
  .rewardItem(nameToId("Lobster"))
  .failItem(nameToId("Burnt lobster"))
  .stopBurn(74)
  .gauntlets(64)
  .finalise();

const cookables = [
  chicken,
  lobster,
];

const Cooking = {
  cookables,
  id: SkillNames.cooking,
};

export default Cooking;
