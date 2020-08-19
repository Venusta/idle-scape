/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
import { store } from "../redux-stuff";
import {
  AttackStyle, AttackType, SkillsStats, EquipmentSlots, EquipmentBonuses,
} from "../types/types";
import { SimpleMonster } from "./SimpleMonster";
import { testMonster } from "../constants/monsters/TestMonster";
import { getRandomInt } from "../util";
import { Equipment } from "./Equipment";

type EffectiveLevels = {
  attack: number,
  strength: number,
  defence: number,
  ranged: number,
  magic: number,
};

export interface CombatStats {
  attack: number;
  defence: number;
  strength: number;
  ranged: number;
  prayer?: number;
  magic: number;
}

interface CombatBonuses {
  playerStrengthBonus: number;
  playerAttackBonus: number;
  playerDefenceBonus: number;
  monsterAttackBonus: number;
  monsterDefenceBonus: number;
}

const addAttackStance = (attackStyle: AttackStyle, attackType: AttackType, combatStats: EffectiveLevels) => {
  let {
    attack, strength, defence, ranged,
  } = combatStats;

  if (attackType === AttackType.Ranged) {
    // Using ranged
    switch (attackStyle) {
      case AttackStyle.accurate:
        ranged += 3;
        break;
      case AttackStyle.longrange:
        defence += 3;
        break;
      default:
        break;
    }
  } else if (attackType === AttackType.Magic) {
    // Using magic
    // TODO: actually check if weapon is trident
  } else {
    // Using melee
    switch (attackStyle) {
      case AttackStyle.accurate:
        attack += 3;
        break;
      case AttackStyle.controlled:
        attack += 1;
        strength += 1;
        defence += 1;
        break;
      case AttackStyle.aggressive:
        strength += 3;
        break;
      default:
        break;
    }
  }
  return {
    ...combatStats, attack, strength, defence, ranged,
  };
};

const addToEffectiveLevels = (playerEffectiveLevels: EffectiveLevels, amount = 0) => {
  return Object.entries(playerEffectiveLevels).reduce((accum, [key, value]) => {
    if (key === "hitpoints") {
      return { ...accum, [key]: value };
    }
    return { ...accum, [key]: value + amount };
  }, {}) as EffectiveLevels;
};

const getBoostedCombatStats = (stats: SkillsStats): CombatStats => {
  return {
    attack: stats.attack.level + stats.attack.boost,
    defence: stats.defence.level + stats.defence.boost,
    strength: stats.strength.level + stats.strength.boost,
    ranged: stats.ranged.level + stats.ranged.boost,
    prayer: stats.prayer.level + stats.prayer.boost,
    magic: stats.magic.level + stats.magic.boost,
  };
};

export class CombatSimulator {
  private monster: SimpleMonster;
  private timeLimit: number;
  private supplies: any;
  private attackStyle: AttackStyle;
  private attackType: AttackType;
  private attackSpeed: number;
  private skills: SkillsStats;
  private equipment: EquipmentSlots;

  constructor(
    monsterID: number,
    playerID: string,
    timeLimit: number,
    attackStyle: AttackStyle,
    supplies: any,
  ) {
    this.skills = store.getState().characters.skills[playerID];
    this.equipment = store.getState().characters.equipment[playerID];
    this.timeLimit = timeLimit;
    this.supplies = supplies;

    const equipment = new Equipment(this.equipment);
    this.attackStyle = attackStyle;
    this.attackType = equipment.getAttackType(this.attackStyle);
    this.attackSpeed = equipment.getAttackSpeed(this.attackStyle);

    this.monster = testMonster; // getMonsterByID(monsterID)
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
    return Math.floor(0.5 + (effectiveLevel * (equipmentBonus + 64)) / 640);
  };

  public calculateEffectiveLevelsPlayer = (): EffectiveLevels => {
    const boostedCombatStats = getBoostedCombatStats(this.skills);
    console.log(boostedCombatStats);

    // TODO: Handle prayer bonus here

    let playerEffectiveLevels = addAttackStance(this.attackStyle, this.attackType, boostedCombatStats);
    console.log(playerEffectiveLevels);

    playerEffectiveLevels = addToEffectiveLevels(playerEffectiveLevels, 8);
    console.log(playerEffectiveLevels);

    // TODO: Handle set bonuses here

    return playerEffectiveLevels;
  };

  private calculateEffectiveLevelsMonster = (): EffectiveLevels => {
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

    return monsterEffectiveLevels;
  };

  private rollHit = (accuracy: number, maxHit: number) => {
    const roll = Math.random();
    if (roll < accuracy) {
      return getRandomInt(0, maxHit);
    }
    return 0;
  };

  private getRelevantCombatBonuses = (playerAttackType: AttackType, monsterAttackType: AttackType, equipmentBonuses: EquipmentBonuses): CombatBonuses => {
    const combatBonuses = {
      playerStrengthBonus: 0,
      playerAttackBonus: 0,
      playerDefenceBonus: 0,
      monsterAttackBonus: 0,
      monsterDefenceBonus: 0,
    };

    // Figure out player attack & strength bonus and monster defence bonus based on player attack type
    switch (playerAttackType) {
      case AttackType.Ranged:
        combatBonuses.playerAttackBonus = equipmentBonuses.attack_ranged;
        combatBonuses.playerStrengthBonus = equipmentBonuses.ranged_strength;
        combatBonuses.monsterDefenceBonus = this.monster.data.defenceRanged;
        break;
      case AttackType.Magic:
        combatBonuses.playerAttackBonus = equipmentBonuses.attack_magic;
        combatBonuses.playerStrengthBonus = equipmentBonuses.magic_damage;
        combatBonuses.monsterDefenceBonus = this.monster.data.defenceMagic;
        break;
      case AttackType.Crush:
        combatBonuses.playerAttackBonus = equipmentBonuses.attack_crush;
        combatBonuses.playerStrengthBonus = equipmentBonuses.melee_strength;
        combatBonuses.monsterDefenceBonus = this.monster.data.defenceCrush;
        break;
      case AttackType.Slash:
        combatBonuses.playerAttackBonus = equipmentBonuses.attack_slash;
        combatBonuses.playerStrengthBonus = equipmentBonuses.melee_strength;
        combatBonuses.monsterDefenceBonus = this.monster.data.defenceSlash;
        break;
      case AttackType.Stab:
        combatBonuses.playerAttackBonus = equipmentBonuses.attack_stab;
        combatBonuses.playerStrengthBonus = equipmentBonuses.melee_strength;
        combatBonuses.monsterDefenceBonus = this.monster.data.defenceStab;
        break;
      default:
        break;
    }

    // Figure out monster attack bonus and player defence bonus based on monster attack type
    switch (monsterAttackType) {
      case AttackType.Ranged:
        combatBonuses.monsterAttackBonus = this.monster.data.attackRanged;
        combatBonuses.playerDefenceBonus = equipmentBonuses.defence_ranged;
        break;
      case AttackType.Magic:
        combatBonuses.monsterAttackBonus = this.monster.data.attackMagic;
        combatBonuses.playerDefenceBonus = equipmentBonuses.defence_magic;
        break;
      case AttackType.Crush:
        combatBonuses.monsterAttackBonus = this.monster.data.attackCrush;
        combatBonuses.playerDefenceBonus = equipmentBonuses.defence_crush;
        break;
      case AttackType.Slash:
        combatBonuses.monsterAttackBonus = this.monster.data.attackSlash;
        combatBonuses.playerDefenceBonus = equipmentBonuses.defence_slash;
        break;
      case AttackType.Stab:
        combatBonuses.monsterAttackBonus = this.monster.data.attackStab;
        combatBonuses.playerDefenceBonus = equipmentBonuses.defence_stab;
        break;
      default:
        // So we need to think about what to do when monster attack type is 'melee'
        // I guess just default to slash for now, probably fine forever tbh
        combatBonuses.monsterAttackBonus = this.monster.data.attackSlash;
        combatBonuses.playerDefenceBonus = equipmentBonuses.defence_slash;
        break;
    }

    return combatBonuses;
  };

  private getDamageAndAccuracyLevels = (playerAttackType: AttackType, playerEffectiveLevels: EffectiveLevels): { damage: number, accuracy: number } => {
    const relevantDamageAndAccuracyLevels = {
      damage: 0,
      accuracy: 0,
    };

    switch (playerAttackType) {
      case AttackType.Ranged:
        // Ranged: accuracy and damage both scale with the player's ranged level
        relevantDamageAndAccuracyLevels.damage = playerEffectiveLevels.ranged;
        relevantDamageAndAccuracyLevels.accuracy = playerEffectiveLevels.ranged;
        break;
      case AttackType.Magic:
        // Magic: accuracy and damage both scale with the player's magic level (probably only for fucking trident)
        relevantDamageAndAccuracyLevels.damage = playerEffectiveLevels.magic;
        relevantDamageAndAccuracyLevels.accuracy = playerEffectiveLevels.magic;
        break;
      default:
        // Melee: accuracy scales with player's attack level, damage with player's strength level
        relevantDamageAndAccuracyLevels.damage = playerEffectiveLevels.strength;
        relevantDamageAndAccuracyLevels.accuracy = playerEffectiveLevels.attack;
        break;
    }

    return relevantDamageAndAccuracyLevels;
  };

  public simulate = (): { killcount: number; time: number } => {
    const playerEffectiveLevels = this.calculateEffectiveLevelsPlayer();
    const monsterEffectiveLevels = this.calculateEffectiveLevelsMonster();

    const {
      damage: playerEffectiveDamageLevel,
      accuracy: playerEffectiveAccuracyLevel,
    } = this.getDamageAndAccuracyLevels(this.attackType, playerEffectiveLevels);

    const playerEquipmentBonuses = new Equipment(this.equipment).equipmentBonuses;

    const {
      playerStrengthBonus,
      playerAttackBonus,
      playerDefenceBonus,
      monsterAttackBonus,
      monsterDefenceBonus,
    } = this.getRelevantCombatBonuses(this.attackType, this.monster.data.attackType[0], playerEquipmentBonuses);

    const monsterMaxAttackRoll = this.calculateMaxRoll(monsterEffectiveLevels.attack, monsterAttackBonus);
    const monsterMaxDefenceRoll = this.calculateMaxRoll(monsterEffectiveLevels.defence, monsterDefenceBonus);
    const playerMaxAttackRoll = this.calculateMaxRoll(playerEffectiveAccuracyLevel, playerAttackBonus);
    const playerMaxDefenceRoll = this.calculateMaxRoll(playerEffectiveLevels.defence, playerDefenceBonus);

    const playerMaxHit = this.calculateMaxHit(playerEffectiveDamageLevel, playerStrengthBonus);
    const monsterMaxHit = this.monster.data.maxHit;

    console.log(`Player max hit: ${playerMaxHit}`);
    console.log(`Monster max hit: ${monsterMaxHit}`);

    const monsterAccuracy = this.calculateAccuracy(monsterMaxAttackRoll, playerMaxDefenceRoll);
    const playerAccuracy = this.calculateAccuracy(playerMaxAttackRoll, monsterMaxDefenceRoll);

    console.log(`Player accuracy: ${playerAccuracy}`);
    console.log(`Monster accuracy: ${monsterAccuracy}`);

    let playerHitpoints = this.skills.hitpoints.level + this.skills.hitpoints.boost;
    let monsterHitpoints = this.monster.data.hitpoints;
    let killcount = 0;
    let time = 0; // In in-game ticks (0.6s per tick)
    let playerAttackCountdown = 0;
    let monsterAttackCountdown = 2;
    const playerEatThreshold = playerHitpoints - 20 - this.skills.hitpoints.boost; // TODO: determine number from how much the food heals

    let saveMyPc = 0;

    const gameTick = 600;

    while (true) {
      saveMyPc += 1;
      if (saveMyPc > 6002) { // one hour
        console.error("NO INFINITY LOOP PLS THX!");
        break;
      }
      if (time * 0.6 > this.timeLimit) {
        console.log("Time limit reached, returning early.");
        break;
      }

      if (playerHitpoints < playerEatThreshold) {
        playerHitpoints += 20; // TODO: replace 20 with actual healing value of food in this.supplies
        // remove 1 food from supplies
        playerAttackCountdown += 3; // 3 tick delay after eating food
      }

      if (playerAttackCountdown <= 0) {
        monsterHitpoints -= this.rollHit(playerAccuracy, playerMaxHit);
        if (monsterHitpoints <= 0) {
          // ded monster
          killcount += 1;
          monsterHitpoints = this.monster.data.hitpoints;
        }
        playerAttackCountdown = this.attackSpeed;
      }

      if (monsterAttackCountdown <= 0) {
        playerHitpoints -= this.rollHit(monsterAccuracy, monsterMaxHit);
        if (playerHitpoints <= 0) {
          // ded player
          console.log("Player died, returning.");
          break;
        }
        monsterAttackCountdown = this.monster.data.attackSpeed;
      }

      // Increment time counter by one tick
      time += 1;

      // Decrement attack cooldown counters
      playerAttackCountdown -= 1;
      monsterAttackCountdown -= 1;
    }

    console.log(`Trip results: ${killcount} kills in ${Math.round(time * 0.6)} second(s).`);

    return { killcount, time };
  };
}
