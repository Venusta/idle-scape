import Skills from "../model/Skills";

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
  attackSpeed: number;
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

export interface Player {
  id: number;
  name: string;
  skills: Skills
  bank: ItemBank;
  inventory: ItemBank;
  equipment: EquipmentSlots
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

export interface EquipmentSlots {
  head: number;
  body: number;
  legs: number;
  feet: number;
  hands: number;
  cape: number;
  weapon: number;
  shield: number;
  ammo: number;
  ring: number;
  neck: number;
}

export enum EquipmentSlotNames {
  Head = "head",
  Body = "body",
  Legs = "legs",
  Feet = "feet",
  Hands = "hands",
  Cape = "cape",
  Weapon = "weapon",
  Shield = "shield",
  Ammo = "ammo",
  Ring = "ring",
  Neck = "neck"
}

export interface CompleteItemData {
  "id": number;
  "name": string;
  "incomplete": boolean;
  "members": boolean;
  "tradeable": boolean;
  "tradeable_on_ge": boolean;
  "stackable": boolean;
  "stacked": null;
  "noted": boolean;
  "noteable": boolean;
  "linked_id_item": number | null;
  "linked_id_noted": number | null;
  "linked_id_placeholder": number | null;
  "placeholder": boolean;
  "equipable": boolean;
  "equipable_by_player": boolean;
  "equipable_weapon": boolean;
  "cost": number;
  "lowalch": number | null;
  "highalch": number | null;
  "weight": number;
  "buy_limit": number | null;
  "quest_item": boolean;
  "release_date": string;
  "duplicate": boolean;
  "examine": string;
  "icon": string;
  "wiki_name": string;
  "wiki_url": string;
  "wiki_exchange": string | null;
  "equipment": EquipmentData | null;
  "weapon": WeaponData | null;
}

export interface EquipmentData {
  "attack_stab": number;
  "attack_slash": number;
  "attack_crush": number;
  "attack_magic": number;
  "attack_ranged": number;
  "defence_stab": number;
  "defence_slash": number;
  "defence_crush": number;
  "defence_magic": number;
  "defence_ranged": number;
  "melee_strength": number;
  "ranged_strength": number;
  "magic_damage": number;
  "prayer": number;
  "slot": EquipmentSlotNames;
  "requirements": EquipableRequirements | null;
}

export interface EquipableRequirements {
  attack?: number;
  strength?: number;
  defence?: number;
  ranged?: number;
  magic?: number;
  prayer?: number;
}

export interface WeaponData {
  "attack_speed": number;
  "weapon_type": string;
  "stances": WeaponStance[];
}

export interface WeaponStance {
  "combat_style": string;
  "attack_type": AttackType | null;
  "attack_style": AttackStyle | null;
  "experience": string;
  "boosts": string | null;
}

export enum AttackStyle {
  aggressive = "aggressive",
  accurate = "accurate",
  controlled = "controlled",
  defensive = "defensive",
  rapid = "rapid",
  longrange = "longrange",
}

export enum AttackType {
  Stab = "stab",
  Slash = "slash",
  Crush = "crush",
  Magic = "magic",
  Ranged = "ranged"
}

export interface EquipmentBonuses {
  "attack_stab": number;
  "attack_slash": number;
  "attack_crush": number;
  "attack_magic": number;
  "attack_ranged": number;
  "defence_stab": number;
  "defence_slash": number;
  "defence_crush": number;
  "defence_magic": number;
  "defence_ranged": number;
  "melee_strength": number;
  "ranged_strength": number;
  "magic_damage": number;
  "prayer": number;
}
