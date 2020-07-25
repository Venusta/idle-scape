import { ItemBank, ItemData } from "../types/types";

export const addToItemBank = (bank: ItemBank, item: ItemData): ItemBank => {
  const tempBank = { ...bank };
  const { item: id, amount } = item;
  if (tempBank[id]) {
    tempBank[id] += amount;
  } else {
    tempBank[id] = amount;
  }
  return tempBank;
};

const parseItem = (singleItem: [string, number]): ItemData => {
  const [itemID, amount] = singleItem;
  const item = parseInt(itemID, 10);
  return { item, amount };
};

export const addBankToBank = (bank: ItemBank, bankToAdd: ItemBank): ItemBank => {
  let tempBank : ItemBank = { ...bank };
  Object.entries(bankToAdd).forEach((singleItem) => {
    tempBank = addToItemBank(tempBank, parseItem(singleItem));
  });
  return tempBank;
};
