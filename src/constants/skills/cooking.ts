import { SkillNames } from "../data";
import CookingTaskBuilder from "../../model/CookingTaskBuilder";

const chicken = new CookingTaskBuilder({ name: "chicken" })
  .reqSkill(SkillNames.cooking, 1)
  .rewardExp(SkillNames.cooking, 30)
  .reqItem("Raw chicken")
  .rewardItem("Cooked chicken")
  .failItem("Burnt chicken")
  .stopBurn(24)
  .finalise();

const salmon = new CookingTaskBuilder({ name: "salmon" })
  .reqSkill(SkillNames.cooking, 25)
  .rewardExp(SkillNames.cooking, 90)
  .reqItem("Raw salmon")
  .rewardItem("Salmon")
  .failItem("Burnt fish") // todo stupid same name bullshit
  .stopBurn(58)
  .finalise();

const lobster = new CookingTaskBuilder({ name: "lobster" })
  .reqSkill(SkillNames.cooking, 40)
  .rewardExp(SkillNames.cooking, 120)
  .reqItem("Raw lobster")
  .rewardItem("Lobster")
  .failItem("Burnt lobster")
  .stopBurn(74)
  .gauntlets(64)
  .finalise();

const cookables = [
  chicken,
  salmon,
  lobster,
];

const Cooking = {
  cookables,
  id: SkillNames.cooking,
};

export default Cooking;
