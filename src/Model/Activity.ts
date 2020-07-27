import Player from "./Player";
import { ItemBank } from "../types/types";

type ActivityReward = {
  exp?: ExperienceReward[];
  item?: ItemBank;
};

type ExperienceReward = {
  skill: string,
  amount: number,
};

type SkillRequirement = {
  requiredLevel: number,
  skill: string,
};

type ActivityRequirement = {
  skills: SkillRequirement[];
};

export default class Activity {
  public id: number;
  private reward: ActivityReward;
  private requirements: ActivityRequirement;

  constructor(id: number, reward: ActivityReward, requirements: ActivityRequirement) {
    this.id = id;
    this.reward = reward;
    this.requirements = requirements;
  }

  do = (player: Player) : ActivityReward => {
    if (this.hasRequirements(player)) {
      return this.reward;
    }
    console.error(`Requirements for activity ${this.id} not met.`);
    return {};
  };

  hasRequirements = (player: Player) : boolean => {
    const hasRequirements = true;

    console.log(player.skills.agility.level);

    // Check skill requirements
    // const skillRequirements = this.requirements.skills;
    // for (let index = 0; index < skillRequirements.length; index += 1) {
    //   const skillRequirement = skillRequirements[index];
    //   const { requiredLevel, skill } = skillRequirement;
    //   const playerLevel = player.skills[skill].getLevel();
    //   console.log(playerLevel, requiredLevel);
    //   if (playerLevel < requiredLevel) {
    //     hasRequirements = false;
    //   }
    // }

    return hasRequirements;
  };
}
