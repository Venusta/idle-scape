import { levelToExp } from "./levelToExp";

export const expToLevel = (exp: number): number => {
  for (let lvl = 1; lvl <= 99; lvl += 1) {
    if (levelToExp(lvl) > exp) { return lvl - 1; }
  }
  return 99;
};
