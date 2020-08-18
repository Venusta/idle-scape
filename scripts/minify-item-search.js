/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable */
const fs = require("fs");

const rawdata = fs.readFileSync("items-cache-data.json");
const data = JSON.parse(rawdata);

const itemFilter = (item) => !item.placeholder && !item.noted && !item.linked_id_item;

const trashItems = [617, 8890, 6964, 20405, 4178];

/* test items
coins === 995
abyssal whip === 4151
*/

const includedNames = ["Abyssal whip", "Coins", "Dwarf remains", "Cooked chicken"];
const shrinkedData = Object.values(data).filter(itemFilter).reduce((accum, thing) => {
  const { id, name } = thing;

  // if (!includedNames.includes(name) || trashItems.includes(id)) {
  if (trashItems.includes(id)) {
    return accum;
  }

  // const has = Object.keys(accum).some((ele) => {
  //   return ele === name;
  // });
  // if (has) {
  //   if (accum[name] < id) {
  //     return {
  //       ...accum,
  //       [name]: accum[name],
  //     };
  //   }
  // }

  return {
    ...accum,
    // [id]: name,
    [name]: id,
  };
}, {});

fs.writeFileSync("mini-item-search-data.json", JSON.stringify(shrinkedData));
