/* eslint-disable arrow-body-style */
/* eslint-disable max-len */
import { levelToExpLookupTable } from "./levelToExp";

export const expToLevel = (exp: number): number => {
  for (let lvl = 1; lvl <= 99; lvl += 1) {
    if (levelToExpLookupTable(lvl) > exp) { return lvl - 1; }
  }
  return 99;
};
