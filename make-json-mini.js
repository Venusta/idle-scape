/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const fs = require("fs");

const rawdata = fs.readFileSync("items-weapon.json");
const data = JSON.parse(rawdata);

const x = ["id", "name", "equipable", "equipment", "weapon"];

let empty = {};
const empty2 = {};

Object.entries(data).forEach(([key, value]) => {
  Object.entries(value).forEach(([key2, value2]) => {
    if (x.includes(key2)) {
      empty = { ...empty, [key2]: value2 };
    }
  });
  empty2[key] = { ...empty };
});
console.log(empty);
// fs.writeFileSync("mini-items-weapon.json", JSON.stringify(empty2));
