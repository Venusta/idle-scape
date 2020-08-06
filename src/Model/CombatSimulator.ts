/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
import store from "../redux-stuff";
import { AttackStyle, Player } from "../types/types";
import SimpleMonster from "./SimpleMonster";
import TestMonster from "../constants/monsters/TestMonster";
import { getRandomInt } from "../util";
import Equipment from "./Equipment";

enum StyleValue {
  aggressive = 3,
  melee_accurate = 3,
  controlled = 1,
  defensive = 3,
  longRange = 3,
  ranged_accurate = 3
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

type EffectiveLevels2 = {
  attack: number,
  strength: number,
  defence: number,
  ranged: number,
  magic: number,
};

export interface CombatStat {
  level: number;
  boost?: number
}
export interface CombatStats {
  attack: CombatStat;
  defence: CombatStat;
  strength: CombatStat;
  hitpoints: CombatStat;
  ranged: CombatStat;
  prayer?: CombatStat;
  magic: CombatStat;
}
type Aids2 = {
  attack: number,
  strength: number,
  defence: number,
  ranged: number,
  magic: number,
};

const addAttackStance = (attackStyle: AttackStyle, combatStats: EffectiveLevels2) => {
  let {
    attack, strength, defence, ranged,
  } = combatStats;
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
    case AttackStyle.defensive:
    case AttackStyle.longrange:
      defence += 3;
      break;
    // case AttackStyle.ranged_accurate:
    //   ranged += 3;
    //   break;
    default:
      break;
  }
  return {
    ...combatStats, attack, strength, defence, ranged,
  };
};

const addToEffectiveLevels = (playerEffectiveLevels: EffectiveLevels2, amount = 0) => {
  return Object.entries(playerEffectiveLevels).reduce((accum, [key, value]) => {
    if (key === "hitpoints") {
      return { ...accum, [key]: value };
    }
    return { ...accum, [key]: value + amount };
  }, {}) as EffectiveLevels2;
};

const addBoost = (levelData: CombatStats) => { // TODO redo this
  return Object.entries(levelData).reduce((accum, [skill, { level, boost = 0 }]: [string, CombatStat]) => {
    return {
      ...accum,
      [skill]: level + boost,
    };
  }, {}) as Aids2;
};

export default class CombatSimulator {
  private monster: SimpleMonster;
  private timeLimit: number;
  private supplies: any;
  private player: Player;
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
    this.player = {
      id: playerID,
      name: store.getState().characters.names[playerID],
      skills: store.getState().characters.skills[playerID],
      equipment: store.getState().characters.equipment[playerID],
      bank: store.getState().characters.banks[playerID],
    };
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
    return Math.floor(0.5 + (effectiveLevel * (equipmentBonus + 64)) / 640);
  };

  public calculateEffectiveLevelsPlayer = (skills: CombatStats, type = 0): EffectiveLevels2 => {
    // const {
    //   attack, strength, defence, ranged, magic,
    // } = skills;

    // TODO format the skills object to stat:level, we want to keep the format consistent
    console.log(skills);
    const boostedStats = addBoost(skills);
    console.log(boostedStats);
    // TODO: Handle prayer bonus here

    let playerEffectiveLevels = addAttackStance(this.attackStyle, boostedStats);
    console.log(playerEffectiveLevels);

    playerEffectiveLevels = addToEffectiveLevels(playerEffectiveLevels, 8);
    console.log(playerEffectiveLevels);

    return playerEffectiveLevels;
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
    // Floor result

    // Handle attack style bonuses
    switch (this.attackStyle) {
      case AttackStyle.accurate:
        playerEffectiveLevels.attack += 3;
        break;
      case AttackStyle.controlled:
        playerEffectiveLevels.attack += 1;
        playerEffectiveLevels.strength += 1;
        playerEffectiveLevels.defence += 1;
        break;
      case AttackStyle.aggressive:
        playerEffectiveLevels.strength += 3;
        break;
      case AttackStyle.defensive:
      case AttackStyle.longrange:
        playerEffectiveLevels.defence += 3;
        break;
      // case AttackStyle.accurate:
      //   playerEffectiveLevels.ranged += 3;
      //   break;
      default:
        break;
    }

    // Add 8 for some reason
    playerEffectiveLevels = addToEffectiveLevels(playerEffectiveLevels, 8);

    // TODO: Handle void set bonuses here
    // Also multiplicative so has to be done last
    // Also floor result

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
    const roll = Math.random();
    if (roll < accuracy) {
      return getRandomInt(0, maxHit);
    }
    return 0;
  };

  public simulate = (): { killcount: number; time: number } => {
    const {
      player: playerEffectiveLevels,
      monster: monsterEffectiveLevels,
    } = this.calculateEffectiveLevels();

    const playerEffectiveDamageLevel = 1;
    const playerEffectiveHitLevel = 1;

    const playerEquipmentBonuses = new Equipment(this.player).equipmentBonuses;

    // switch (this.attackStyle) {
    //   case AttackStyle.aggressive:
    //   case AttackStyle.accurate:
    //   case AttackStyle.controlled:
    //   case AttackStyle.defensive:
    //     playerEffectiveDamageLevel = playerEffectiveLevels.strength;
    //     playerEffectiveHitLevel = playerEffectiveLevels.attack;
    //     break;
    //   case AttackStyle.rapid:
    //   case AttackStyle.accurate:
    //   case AttackStyle.longrange:
    //     playerEffectiveDamageLevel = playerEffectiveLevels.ranged;
    //     playerEffectiveHitLevel = playerEffectiveLevels.ranged;
    //     break;
    //   default:
    // }

    const playerEquipmentStrBonus = 103; // TODO: Get this from actual player data
    const playerEquipmentAttackBonus = 114; // TODO: Get this from player data too (needs to be bonus of weapon attack style used)
    const playerEquipmentDefenceBonus = 216; // TODO: also get this from player data (defence against monster attack style)
    const monsterEquipmentDefenceBonus = this.monster.data.defenceSlash; // TODO: also actually determine what defence this is based on attack style used by player
    const monsterEquipmentAttackBonus = this.monster.data.attackSlash; // TODO: blabla

    const monsterMaxAttackRoll = this.calculateMaxRoll(monsterEffectiveLevels.attack, monsterEquipmentAttackBonus);
    const monsterMaxDefenceRoll = this.calculateMaxRoll(monsterEffectiveLevels.defence, monsterEquipmentDefenceBonus);
    const playerMaxAttackRoll = this.calculateMaxRoll(playerEffectiveHitLevel, playerEquipmentAttackBonus);
    const playerMaxDefenceRoll = this.calculateMaxRoll(playerEffectiveLevels.defence, playerEquipmentDefenceBonus);

    const playerMaxHit = this.calculateMaxHit(playerEffectiveDamageLevel, playerEquipmentStrBonus);
    const monsterMaxHit = this.monster.data.maxHit;

    console.log(`Player max hit: ${playerMaxHit}`);
    console.log(`Monster max hit: ${monsterMaxHit}`);

    const monsterAccuracy = this.calculateAccuracy(monsterMaxAttackRoll, playerMaxDefenceRoll);
    const playerAccuracy = this.calculateAccuracy(playerMaxAttackRoll, monsterMaxDefenceRoll);

    console.log(`Player accuracy: ${playerAccuracy}`);
    console.log(`Monster accuracy: ${monsterAccuracy}`);

    let playerHitpoints = this.player.skills.hitpoints.level + this.player.skills.hitpoints.boost;
    let monsterHitpoints = this.monster.data.hitpoints;
    let killcount = 0;
    let time = 0; // In in-game ticks (0.6s per tick)
    let playerAttackCountdown = 0;
    let monsterAttackCountdown = 2;
    const playerEatThreshold = playerHitpoints - 20; // TODO: determine number from how much the food heals

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
        playerAttackCountdown = 4; // TODO: get attack speed from weapon used
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
