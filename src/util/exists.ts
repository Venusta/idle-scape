/* eslint-disable no-restricted-syntax */
export type Nil = null | undefined;
export type Optional<T> = T | Nil;

/**
 * Checks if a value is Nil and typeguards.
 * Nil is defined as either null or undefined.
 *
 * @export
 * @template T
 * @param {Optional<T>} value
 * @returns {value is Nil}
 */
export function isNil<T>(value: Optional<T>): value is Nil {
  if (value === null || value === undefined) {
    return true;
  }

  return false;
}

/**
 * Checks if a value exists by making sure it's not Nil.
 *
 * @export
 * @template T
 * @param {Optional<T>} value
 * @returns {value is T}
 */
export function exists<T>(value: Optional<T>): value is T {
  return !isNil(value);
}

/**
 * Checks if a value exists by making sure it's not Nil.
 * In case it does not, throws a NotFoundError.
 *
 * @export
 * @template T
 * @param {Optional<T>} value
 * @returns {T}
 */
export function mustExist<T>(value: Optional<T>): T {
  if (isNil(value)) {
    throw new Error("Value must exist!");
  }

  return value;
}

/**
 * Checks if all values in an array are not Nil.
 *
 * @export
 * @param {Array<any>} values
 * @returns
 */
export function existsBulk(values: Array<any>): boolean {
  for (const value of values) {
    if (isNil(value)) {
      return false;
    }
  }

  return true;
}

export function isObjKey<T>(key: any, obj: T): key is keyof T {
  return key in obj;
}

// type SkillName = "fishing" | "cooking" | "strength";

// type Der = {
//   [key in SkillName]?: number;
// };

// const exp: Der = {
//   fishing: 30,
//   strength: 50,
// };

// const exp2: Der = {
//   fishing: 20,
//   cooking: 50,
// };

// const result = [exp, exp2].reduce((prev, next) => {
//   const nextKeys = Object.keys(next) as Array<SkillName>;
//   const newSkills: Der = { ...prev };

//   nextKeys.forEach((key) => {
//     if (exists(newSkills[key])) {
//       newSkills[key] = mustExist(next[key]) + mustExist(newSkills[key]);
//     } else {
//       newSkills[key] = next[key];
//     }
//   });

//   return newSkills;
// });

// console.log(result);
