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
  maxWeight: number;
  bait?: number;
  fishingSpot: FishingSpot
}

// todo maybe get rid of chaining and use a method for each specific thing
// todo builder for this, ensure highest level fish is first, idk
const tasks: FishingTasks[] = [
  {
    names: ["shrimp", "anchovies", "trout"],
    tool: { item: nameToId("Small fishing net"), amount: 1 },
    bait: nameToId("Feather"),
    maxWeight: 255,
    fishingSpot: {
      shrimp: new FishingTaskBuilder({ name: "shrimp" })
        .reqSkill(SkillNames.fishing, 1)
        .rewardExp(SkillNames.fishing, 10)
        .rewardItem("Raw shrimps")
        .weight(32, 192)
        .finalise(),

      anchovies: new FishingTaskBuilder({ name: "anchovies" })
        .reqSkill(SkillNames.fishing, 15)
        .rewardExp(SkillNames.fishing, 40)
        .rewardItem("Raw anchovies")
        .weight(16, 96)
        .finalise(),

      trout: new FishingTaskBuilder({ name: "trout" })
        .reqSkill(SkillNames.fishing, 25)
        .rewardExp(SkillNames.fishing, 90)
        .rewardItem("Raw trout")
        .weight(8, 64)
        .finalise(),
    },
  },
  {
    names: ["leaping trout", "leaping salmon", "leaping sturgeon"],
    tool: { item: nameToId("Small fishing net"), amount: 1 },
    // bait: nameToId("Feather"),
    maxWeight: 255,
    fishingSpot: {
      "leaping trout": new FishingTaskBuilder({ name: "leaping trout" })
        .reqSkill(SkillNames.fishing, 48)
        .reqSkill(SkillNames.agility, 15)
        .reqSkill(SkillNames.strength, 15)
        .rewardExp(SkillNames.fishing, 50)
        .rewardExp(SkillNames.agility, 5)
        .rewardExp(SkillNames.strength, 5)
        .rewardItem("Leaping trout")
        .weight(32, 192)
        .finalise(),

      "leaping salmon": new FishingTaskBuilder({ name: "leaping salmon" })
        .reqSkill(SkillNames.fishing, 58)
        .rewardExp(SkillNames.fishing, 70)
        .rewardExp(SkillNames.agility, 6)
        .rewardExp(SkillNames.strength, 6)
        .rewardItem("Leaping salmon")
        .weight(16, 96)
        .finalise(),

      "leaping sturgeon": new FishingTaskBuilder({ name: "leaping sturgeon" })
        .reqSkill(SkillNames.fishing, 70)
        .rewardExp(SkillNames.fishing, 80)
        .rewardExp(SkillNames.agility, 7)
        .rewardExp(SkillNames.strength, 7)
        .rewardItem("Leaping sturgeon")
        .weight(8, 64)
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
