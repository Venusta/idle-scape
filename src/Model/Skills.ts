import { skill, Skill } from "./Skill";
import { levelToExp } from "../util";

export interface Skills {
  attack: Skill;
  defence: Skill;
  strength: Skill;
  hitpoints: Skill;
  ranged: Skill;
  prayer: Skill;
  magic: Skill;
  cooking: Skill;
  woodcutting: Skill;
  fletching: Skill;
  fishing: Skill;
  firemaking: Skill;
  crafting: Skill;
  smithing: Skill;
  mining: Skill;
  herblore: Skill;
  agility: Skill;
  thieving: Skill;
  slayer: Skill;
  farming: Skill;
  runecrafting: Skill;
  hunter: Skill;
  construction: Skill;
}

export const skills: Skills = {
  attack: skill(levelToExp(70)),
  defence: skill(levelToExp(70)),
  strength: skill(levelToExp(70)),
  hitpoints: skill(levelToExp(70)),
  ranged: skill(levelToExp(70)),
  prayer: skill(levelToExp(70)),
  magic: skill(levelToExp(70)),
  cooking: skill(),
  woodcutting: skill(),
  fletching: skill(),
  fishing: skill(levelToExp(15)),
  firemaking: skill(),
  crafting: skill(),
  smithing: skill(),
  mining: skill(),
  herblore: skill(),
  agility: skill(),
  thieving: skill(),
  slayer: skill(),
  farming: skill(),
  runecrafting: skill(),
  hunter: skill(),
  construction: skill(),
};
