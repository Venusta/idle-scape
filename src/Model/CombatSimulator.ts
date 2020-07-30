/* eslint-disable arrow-body-style */
import store from "../redux-stuff";
import { PlayerOptions } from "../types/types";
import SimpleMonster from "./SimpleMonster";
import TestMonster from "../constants/monsters/TestMonster";

enum AttackStyle {
  aggressive = "aggressive",
  melee_accurate = "accurate",
  controlled = "controlled",
  defensive = "defensive",
  rapid = "rapid",
  longRange = "longRange",
  ranged_accurate = "accurate"
}

enum StyleValue {
  aggressive = 3,
  accurate = 1,
}

type EffectiveLevels = {
  player: {
    attack: number,
    strength: number,
    defence: number,
    ranged: number,
    magic: number,
  },
  monster : {
    attack: number,
    strength: number,
    defence: number,
    ranged: number,
    magic: number,
  }
};

export default class CombatSimulator {
  private monster: SimpleMonster;
  private timeLimit: number;
  private supplies: any;
  private player: PlayerOptions;
  private attackStyle: AttackStyle;

  constructor(
    monsterID: number,
    playerID: number,
    timeLimit: number,
    attackStyle: AttackStyle,
    supplies: any,
  ) {
    this.timeLimit = timeLimit;
    this.supplies = supplies;
    this.player = store.getState().players[playerID]; // 0 for player 1
    this.monster = TestMonster;
    this.attackStyle = attackStyle;
  }

  private calculateAccuracy = (
    maxAttackRoll: number,
    maxDefenceRoll: number,
  ): number => {
    if (maxAttackRoll > maxDefenceRoll) {
      return 1 - (maxDefenceRoll + 2) / (2 * (maxAttackRoll + 1));
    }
    return maxAttackRoll / (2 * maxDefenceRoll + 1);
  };

  private calculateMaxRoll = (effectiveLevel: number, equipmentbonus: number): number => {
    return effectiveLevel * (equipmentbonus + 64);
  };

  private calculateMaxHit = (effectiveLevel: number, equipmentBonus: number) => {
    return 0.5 + (effectiveLevel * (equipmentBonus + 64)) / 640;
  };

  private calculateEffectiveLevels = (): EffectiveLevels => {
    // Obtain player levels
    const {
      attack: playerAttack,
      strength: playerStrength,
      defence: playerDefence,
      ranged: playerRanged,
      magic: playerMagic,
    } = this.player.skills;

    // Calculate base level + boost
    let playerEffectiveLevels = {
      attack: playerAttack.level + playerAttack.boost,
      strength: playerStrength.level + playerStrength.boost,
      defence: playerDefence.level + playerDefence.boost,
      ranged: playerRanged.level + playerRanged.boost,
      magic: playerMagic.level + playerMagic.boost,
    };

    // TODO: Handle prayer bonus here
    // Multiplicative so order matters

    // Handle attack style bonuses
    switch (this.attackStyle) {
      case AttackStyle.melee_accurate:
        playerEffectiveLevels.attack += 3;
        break;
      case AttackStyle.controlled:
        playerEffectiveLevels.attack += 1;
        break;
      case AttackStyle.aggressive:
        playerEffectiveLevels.strength += 3;
        break;
      case AttackStyle.defensive:
      case AttackStyle.longRange:
        playerEffectiveLevels.defence += 3;
        break;
      case AttackStyle.ranged_accurate:
        playerEffectiveLevels.ranged += 3;
        break;
      default:
    }

    // Add 8 for some reason
    type Aids = {
      attack: number,
      strength: number,
      defence: number,
      ranged: number,
      magic: number,
    };
    const add8ToEffectiveLevels = (bleh: Aids) => {
      return Object.entries(bleh).reduce((accum, [skill, amount]) => {
        console.log("yeet");
        return {
          ...accum,
          [skill]: amount + 8,
        };
      }, {}) as Aids;
    };

    playerEffectiveLevels = add8ToEffectiveLevels(playerEffectiveLevels);

    // TODO: Handle void set bonuses here
    // Also multiplicative so has to be done last

    // Obtain monster stats
    const {
      attackLevel: monsterAttack,
      strengthLevel: monsterStrength,
      defenceLevel: monsterDefence,
      rangedLevel: monsterRanged,
      magicLevel: monsterMagic,
    } = this.monster.data;

    // Calculate monster effective levels (+1 attack style bonus and +8 for reasons)
    const monsterEffectiveLevels = {
      attack: monsterAttack + 9,
      strength: monsterStrength + 9,
      defence: monsterDefence + 9,
      ranged: monsterRanged + 9,
      magic: monsterMagic + 9,
    };

    return { player: playerEffectiveLevels, monster: monsterEffectiveLevels };
  };

  private rollHit = (accuracy: number, maxHit: number) => {
    // roll random number between 0 and 1
    // if randomNumber < accuracy
    //    damage = roll random int between 0 and maxHit (idk if this is accurate, probably?)
    // else
    //    damage = 0
  };

  public simulate = (): { kc: number; time: number } => {
    const {
      player: playerEffectiveLevels,
      monster: monsterEffectiveLevels,
    } = this.calculateEffectiveLevels();

    let playerEffectiveDamageLevel = 1;
    let playerEffectiveHitLevel = 1;

    switch (this.attackStyle) {
      case AttackStyle.aggressive:
      case AttackStyle.melee_accurate:
      case AttackStyle.controlled:
      case AttackStyle.defensive:
        playerEffectiveDamageLevel = playerEffectiveLevels.strength;
        playerEffectiveHitLevel = playerEffectiveLevels.attack;
        break;
      case AttackStyle.rapid:
      case AttackStyle.ranged_accurate:
      case AttackStyle.longRange:
        playerEffectiveDamageLevel = playerEffectiveLevels.ranged;
        playerEffectiveHitLevel = playerEffectiveLevels.ranged;
        break;
      default:
    }

    const playerEquipmentStrBonus = 100; // TODO: Get this from actual player data
    const playerEquipmentAttackBonus = 100; // TODO: Get this from player data too (needs to be bonus of weapon attack style used)
    const playerEquipmentDefenceBonus = 100; // TODO: also get this from player data (defence against monster attack style)
    const monsterEquipmentDefenceBonus = this.monster.data.defenceSlash; // TODO: also actually determine what defence this is based on attack style used by player
    const monsterEquipmentAttackBonus = this.monster.data.attackSlash; // TODO: blabla

    const monsterMaxAttackRoll = this.calculateMaxRoll(monsterEffectiveLevels.attack, monsterEquipmentAttackBonus);
    const monsterMaxDefenceRoll = this.calculateMaxRoll(monsterEffectiveLevels.defence, monsterEquipmentDefenceBonus);
    const playerMaxAttackRoll = this.calculateMaxRoll(playerEffectiveHitLevel, playerEquipmentAttackBonus);
    const playerMaxDefenceRoll = this.calculateMaxRoll(playerEffectiveLevels.defence, playerEquipmentDefenceBonus);

    const playerMaxHit = this.calculateMaxHit(playerEffectiveDamageLevel, playerEquipmentStrBonus);
    const monsterMaxHit = this.monster.data.maxHit;

    const monsterAccuracy = this.calculateAccuracy(monsterMaxAttackRoll, playerMaxDefenceRoll);
    const playerAccuracy = this.calculateAccuracy(playerMaxAttackRoll, monsterMaxDefenceRoll);
  };
}
