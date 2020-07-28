export interface MonsterOptions {
  id: number;
  name: string;
}

export interface PlayerOptions {
  id: number;
  name: string;
  skills: Skills;
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

export interface Skill {
  level?: number;
  exp: number;
  boost?: number
}

// export type Skill = number;

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
