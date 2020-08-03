import skill, { Skill } from "./Skill";

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

const skills = (): Skills => ({
  attack: skill(),
  defence: skill(),
  strength: skill(),
  hitpoints: skill(1154),
  ranged: skill(),
  prayer: skill(),
  magic: skill(),
  cooking: skill(),
  woodcutting: skill(),
  fletching: skill(),
  fishing: skill(),
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
});

export default skills;
