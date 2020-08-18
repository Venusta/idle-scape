/* eslint-disable */
const fs = require("fs");

const rawdata = fs.readFileSync("items-cache-data.json");
const data = JSON.parse(rawdata);

const itemFilter = (item) => !item.placeholder && !item.noted;// && !item.linked_id_item;

const skipIDs = [617];
const shrinkedData = Object.values(data).filter(itemFilter).reduce((accum, thing) => {
  const {
    id, name, stackable, equipable, cost, highalch, stacked, linked_id_item,
  } = thing;

  let objBuild = {
    id,
    name,
  };

  if (cost !== 0) {
    objBuild = { ...objBuild, cost };
  }
  if (highalch !== 0) {
    objBuild = { ...objBuild, highalch };
  }
  if (stackable !== false) {
    objBuild = { ...objBuild, stackable };
  }
  if (equipable !== false) {
    objBuild = { ...objBuild, equipable };
  }
  if (stacked !== null) {
    objBuild = { ...objBuild, stacked };
  }
  if (linked_id_item !== null) {
    objBuild = { ...objBuild, linked_id_item };
  }

  if (skipIDs.includes(id)) {
    return accum;
  }
  return {
    ...accum,
    [id]: {
      ...objBuild,
    },
  };
}, {});

fs.writeFileSync("mini-items-cache-data.json", JSON.stringify(shrinkedData));
