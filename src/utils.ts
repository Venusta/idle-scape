/* eslint-disable no-unused-vars */
// @ts-nocheck
const imageCache = {};

export const importAll = (r) => {
  // eslint-disable-next-line no-return-assign
  r.keys().forEach((key) => imageCache[key] = r(key));
};

export const asset = (s: string) => imageCache[`./${s}.png`].default;

export function randomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function getRandomInt(min, max) {
  const tmin = Math.ceil(min);
  const tmax = Math.floor(max) + 1;
  return Math.floor(Math.random() * (tmax - tmin)) + tmin;
}

/**
 * Rolls a 1 in X chance, returning a boolean on successfull rolls.
 * @param upperLimit The upper limit of the roll.
 */
export function rollForOneIn(upperLimit) {
  return getRandomInt(1, upperLimit) === 1;
}

export const addToLootTable = (loot, item) => {
  const { item: id, amount } = item;
  const tempArray = loot;
  if (tempArray[id]) {
    tempArray[id] += amount;
  } else {
    tempArray[id] = amount;
  }
  return tempArray;
};
