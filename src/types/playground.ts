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
