export interface MonsterOptions {
  id: number;
  name: string;
}

export enum MonsterAttribute {
  Demon = "demon",
  Dragon = "dragon",
  Fiery = "fiery",
  Kalphite = "kalphite",
  Leafy = "leafy",
  Penance = "penance",
  Shade = "shade",
  Undead = "undead",
  Vampyre = "vampyre",
  Xerician = "xerician"
}

export enum MonsterSlayerMaster {
  Turael = "turael",
  Krystilia = "krystilia",
  Mazchna = "mazchna",
  Vannaka = "vannaka",
  Chaeldar = "chaeldar",
  Konar = "konar",
  Nieve = "nieve",
  Duradel = "duradel"
}

export enum MonsterAttackType {
  Melee = "melee",
  Magic = "magic",
  Range = "range"
}

export interface MonsterData {
  members: boolean;
  releaseDate: string | null;
  combatLevel: number;
  hitpoints: number;
  maxHit: number;
  attackType: MonsterAttackType[];
  attackSpeed: number | null;
  aggressive: boolean;
  poisonous: boolean;
  immuneToPoison: boolean;
  immuneToVenom: boolean;
  attributes: MonsterAttribute[];
  category: string[];
  examineText: string;
  wikiName: string;
  wikiURL: string;
  attackLevel: number;
  strengthLevel: number;
  defenceLevel: number;
  magicLevel: number;
  rangedLevel: number;
  attackStab: number;
  attackSlash: number;
  attackCrush: number;
  attackMagic: number;
  attackRanged: number;
  defenceStab: number;
  defenceSlash: number;
  defenceCrush: number;
  defenceMagic: number;
  defenceRanged: number;
  attackAccuracy: number;
  meleeStrength: number;
  rangedStrength: number;
  magicDamage: number;
  isSlayerMonster: boolean;
  slayerLevelRequired: number;
  slayerXP: number;
  assignableSlayerMasters: MonsterSlayerMaster[];
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
  boost: number
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
