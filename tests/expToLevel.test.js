import { expToLevel, levelToExp } from "../src/constants/data";

test("Tests expToLevel at 0 experience", () => {
  expect(expToLevel(0)).toBe(1);
});

test("Tests expToLevel at 1 experience", () => {
  expect(expToLevel(1)).toBe(1);
});

test("Tests expToLevel at 82 experience", () => {
  expect(expToLevel(82)).toBe(1);
});

test("Tests expToLevel at 83 experience", () => {
  expect(expToLevel(83)).toBe(2);
});

test("Tests expToLevel at 84 experience", () => {
  expect(expToLevel(84)).toBe(2);
});

test("Tests expToLevel at 13034430 experience", () => {
  expect(expToLevel(13034430)).toBe(98);
});

test("Tests expToLevel at 13034431 experience", () => {
  expect(expToLevel(13034431)).toBe(99);
});

test("Tests expToLevel at 13034432 experience", () => {
  expect(expToLevel(13034432)).toBe(99);
});
