import { expTable } from "../constants/data";

export default class Skill {
  public name: string;
  public exp: number;
  public xpToLevel: number;
  public level: number;

  constructor(name: string, exp: number) {
    this.name = name;
    this.level = exp; // exp to lvl
    this.exp = exp;
    this.xpToLevel = expTable[this.level + 2] - expTable[this.level + 1];
  }

  gainXp(amount: number): void {
    this.exp += amount;
    if (amount > this.xpToLevel) {
      this.xpToLevel -= amount;
    } else {
      this.level += 1;
      this.xpToLevel = expTable[this.level + 2] - this.exp;
    }
  }
}
