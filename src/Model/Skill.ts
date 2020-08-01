import { expToLevel } from "../util";

export default class Skill {
  exp: number;
  level: number;
  boost: number;

  constructor(exp: number) {
    this.exp = exp;
    this.level = expToLevel(exp);
    this.boost = 0;
  }
}
