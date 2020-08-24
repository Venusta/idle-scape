/**
 * Returns a random integer between the specified values.
 * The value is no lower than min (or the next integer greater than min if min isn't an integer),
 * and is less than (but not equal to) max.
 * @param min
 * @param max
 */

export function getRandomInt(min: number, max: number): number {
  const tmin = Math.ceil(min);
  const tmax = Math.floor(max);
  return Math.floor(Math.random() * (tmax - tmin)) + tmin;
}

/**
 * Rolls a number from 0 to max-1
 * @param max
 */
export const randomRoll = (max: number): number => getRandomInt(0, max - 1);
