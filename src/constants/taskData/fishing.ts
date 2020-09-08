import { SkillNames } from "../../model/Skills";
import { FishingTask, ItemMap } from "../../types/types";
import { FishingTaskBuilder } from "../builders/FishingTaskBuilder";
import { nameToId } from "../../util/nameToId";

interface FishingSpot {
  [key: string]: FishingTask;
}

export interface FishingTasks {
  names: string[]
  tool: number;
  maxWeight: number;
  bait?: number;
  fishingSpot: FishingSpot
}

// todo maybe get rid of chaining and use a method for each specific thing
// todo builder for this, ensure highest level fish is first, idk
const tasks: FishingTasks[] = [
  {
    names: ["shrimp", "anchovies", "trout"],
    tool: nameToId("Small fishing net"),
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
    names: ["tuna", "swordfish"],
    tool: nameToId("Harpoon"),
    maxWeight: 255,
    fishingSpot: {
      tuna: new FishingTaskBuilder({ name: "tuna" })
        .reqSkill(SkillNames.fishing, 35)
        .rewardExp(SkillNames.fishing, 80)
        .rewardItem("Raw tuna")
        .weight(32, 192)
        .finalise(),

      swordfish: new FishingTaskBuilder({ name: "swordfish" })
        .reqSkill(SkillNames.fishing, 50)
        .rewardExp(SkillNames.fishing, 100)
        .rewardItem("Raw swordfish")
        .weight(16, 96)
        .finalise(),
    },
  },
  {
    names: ["shark"],
    tool: nameToId("Harpoon"),
    maxWeight: 255,
    fishingSpot: {
      shark: new FishingTaskBuilder({ name: "shark" })
        .reqSkill(SkillNames.fishing, 76)
        .rewardExp(SkillNames.fishing, 110)
        .rewardItem("Raw shark")
        .weight(32, 192)
        .finalise(),
    },
  },
  {
    names: ["leaping trout", "leaping salmon", "leaping sturgeon"],
    tool: nameToId("Barbarian rod"),
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
];

export const fishing = {
  tasks,
  id: SkillNames.fishing,
};
