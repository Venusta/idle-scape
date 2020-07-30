import Player from "src/model/Player";

export interface MonsterOptions {
  id: number;
  name: string;
}

export interface PlayerOptions {
  id: number;
  name: string;
  skills: SkillsStats;
}

interface PlayerID {
  playerID: number;
}

export interface LapOptions extends PlayerID {
  name: string;
  amount: number
}

export type ItemData = {
  item: number;
  amount: number;
};

export type ItemStringData = {
  item: string;
  amount: number;
};

export type Item = [number, number];

export interface ItemBank {
  [key: number]: number;
}

export interface SkillStats {
  level: number;
  exp: number;
  boost?: number
}

// export type Skill = number;

export interface SkillsStats {
  attack: SkillStats;
  defence: SkillStats;
  strength: SkillStats;
  hitpoints: SkillStats;
  ranged: SkillStats;
  prayer: SkillStats;
  magic: SkillStats;
  cooking: SkillStats;
  woodcutting: SkillStats;
  fletching: SkillStats;
  fishing: SkillStats;
  firemaking: SkillStats;
  crafting: SkillStats;
  smithing: SkillStats;
  mining: SkillStats;
  herblore: SkillStats;
  agility: SkillStats;
  thieving: SkillStats;
  slayer: SkillStats;
  farming: SkillStats;
  runecrafting: SkillStats;
  hunter: SkillStats;
  construction: SkillStats;
}
