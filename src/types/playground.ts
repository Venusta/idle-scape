interface SkillLevelReq {
  attack: number
  defence: number
  strength: number
  hitpoints: number
  ranged: number
  prayer: number
  magic: number
  cooking: number
  woodcutting: number
  fletching: number
  fishing: number
  firemaking: number
  crafting: number
  smithing: number
  mining: number
  herblore: number
  agility: number
  thieving: number
  slayer: number
  farming: number
  runecrafting: number
  hunter: number
  construction: number
}

type PartialPick<T, K extends keyof T> = Partial<T> & Pick<T, K>;

type OptionalExceptFor<T, TRequired extends keyof T> = Partial<T> & Pick<T, TRequired>;
type SkillReqTestType = OptionalExceptFor<SkillLevelReq, "fishing" | "agility">;

const reqs: SkillReqTestType = {
  fishing: 5,
  agility: 20,
  construction: 30,
};

export enum SkillNames2 {
  attack = 0,
  defence = 1,
  strength = 2,
  hitpoints = 3,
  ranged = 4,
  prayer = 5,
  magic = 6,
  cooking = 7,
  woodcutting = 8,
  fletching = 9,
  fishing = 10,
  firemaking = 11,
  crafting = 12,
  smithing = 13,
  mining = 14,
  herblore = 15,
  agility = 16,
  thieving = 17,
  slayer = 18,
  farming = 19,
  runecrafting = 20,
  hunter = 21,
  construction = 22,
}
