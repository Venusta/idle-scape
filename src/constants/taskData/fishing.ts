import { SkillNames } from "../data";
import { FishingTask, ItemData } from "../../types/types";
import { FishingTaskBuilder } from "../builders/FishingTaskBuilder";
import { nameToId } from "../../util/nameToId";

interface FishingSpot {
  [key: string]: FishingTask;
}

export interface FishingTasks {
  names: string[]
  tool: ItemData;
  bait?: string;
  fish: FishingSpot
}

const tasks: FishingTasks[] = [
  {
    names: ["shrimp", "anchovies"],
    tool: { item: nameToId("Small fishing net"), amount: 1 },
    fish: {
      shrimp: new FishingTaskBuilder({ name: "shrimp" })
        .reqSkill(SkillNames.fishing, 1)
        .rewardExp(SkillNames.fishing, 10)
        .rewardItem("Raw shrimp")
        .weight(8, 64, 255)
        .finalise(),

      anchovies: new FishingTaskBuilder({ name: "anchovies" })
        .reqSkill(SkillNames.fishing, 15)
        .rewardExp(SkillNames.fishing, 40)
        .rewardItem("Raw anchovies")
        .weight(16, 96, 255)
        .finalise(),
    },
  },
  // {
  //   names: ["salmon", "trout"],
  //   tool: "Small fishing net",
  //   fish: {
  //     salmon: new TaskBuilder({ name: "salmon" })
  //       .reqSkill(SkillNames.fishing, 1)
  //       .rewardExp(SkillNames.fishing, 10)
  //       .finalise(),

  //     trout: new TaskBuilder({ name: "trout" })
  //       .reqSkill(SkillNames.fishing, 15)
  //       .rewardExp(SkillNames.fishing, 40)
  //       .finalise(),
  //   },
  // },

];

export const fishing = {
  tasks,
  id: SkillNames.fishing,
};
