import {
  MonsterOptions, MonsterData, MonsterAttackType, MonsterAttribute,
} from "../types/types";

export default abstract class Monster {
  public id: number;
  public name: string;
  public data: MonsterData;

  constructor({ id, name }: MonsterOptions) {
    this.id = id;
    this.name = name;
    // this.aliases = options.aliases ?? [];
    // this.data = monsterData[this.id];
    this.data = {
      members: true,
      releaseDate: "2005-01-26",
      combatLevel: 96,
      hitpoints: 90,
      maxHit: 11,
      attackType: [MonsterAttackType.Magic],
      attackSpeed: 4,
      aggressive: true,
      poisonous: false,
      immuneToPoison: false,
      immuneToVenom: false,
      attributes: [MonsterAttribute.Undead],
      category: ["aberrant spectre"],
      examineText: "A very smelly ghost.",
      wikiName: "Aberrant spectre",
      wikiURL: "https://oldschool.runescape.wiki/w/Aberrant_spectre",
      attackLevel: 1,
      strengthLevel: 1,
      defenceLevel: 90,
      magicLevel: 105,
      rangedLevel: 1,
      attackStab: 0,
      attackSlash: 0,
      attackCrush: 0,
      attackMagic: 0,
      attackRanged: 0,
      defenceStab: 20,
      defenceSlash: 20,
      defenceCrush: 20,
      defenceMagic: 0,
      defenceRanged: 15,
      attackAccuracy: 0,
      meleeStrength: 0,
      rangedStrength: 0,
      magicDamage: 0,
      isSlayerMonster: true,
      slayerLevelRequired: 60,
      slayerXP: 90,
      assignableSlayerMasters: [],
    };
  }
}
