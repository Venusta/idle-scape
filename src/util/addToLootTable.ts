import { Drop, DropCollection } from "../types/types";

export const addToLootTable = (loot: DropCollection, item: Drop) => {
  const { item: id, amount } = item;
  const tempObject = loot;
  if (tempObject[id]) {
    tempObject[id] += amount;
  } else {
    tempObject[id] = amount;
  }
  return tempObject;
};

export default addToLootTable;
