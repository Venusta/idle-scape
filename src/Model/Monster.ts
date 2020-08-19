import {
  MonsterOptions, MonsterData, AttackType,
} from "../types/types";

export abstract class Monster {
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
      combatLevel: 111,
      hitpoints: 105,
      maxHit: 11,
      attackType: [AttackType.Slash],
      attackSpeed: 4,
      aggressive: true,
      poisonous: false,
      immuneToPoison: false,
      immuneToVenom: false,
      attributes: [],
      category: ["gargoyle"],
      examineText: "Flies like a rock.",
      wikiName: "Gargoyle",
      wikiURL: "https://oldschool.runescape.wiki/w/Gargoyle",
      attackLevel: 75,
      strengthLevel: 105,
      defenceLevel: 107,
      magicLevel: 1,
      rangedLevel: 1,
      attackStab: 0,
      attackSlash: 0,
      attackCrush: 0,
      attackMagic: 0,
      attackRanged: 0,
      defenceStab: 20,
      defenceSlash: 20,
      defenceCrush: 0,
      defenceMagic: 20,
      defenceRanged: 20,
      attackAccuracy: 0,
      meleeStrength: 0,
      rangedStrength: 0,
      magicDamage: 0,
      isSlayerMonster: true,
      slayerLevelRequired: 75,
      slayerXP: 105,
      assignableSlayerMasters: [],
    };
  }
}
