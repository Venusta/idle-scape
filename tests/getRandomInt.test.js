// const getRandomInt = require("../src/util/getRandomInt.ts");
import { getRandomInt } from "../src/util/getRandomInt";

test("Tests getRandomInt", () => {
  expect(getRandomInt(1, 1)).toBe(1);
});
