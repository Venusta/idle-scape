import { ItemBank, ItemData } from "../types/types";

const parseItem = (singleItem: [string, number]): ItemData => {
  const [itemID, amount] = singleItem;
  const item = parseInt(itemID, 10);
  return { item, amount };
};

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

export const addBankToBank = (bank: ItemBank, bankToAdd: ItemBank): ItemBank => {
  let tempBank : ItemBank = { ...bank };
  Object.entries(bankToAdd).forEach((singleItem) => {
    tempBank = addToItemBank(tempBank, parseItem(singleItem));
  });
  return tempBank;
};

export const removeFromItemBank = (bank: ItemBank, item: ItemData): ItemBank => {
  const tempBank = { ...bank };
  const { item: id, amount } = item;
  if (tempBank[id]) {
    if (tempBank[id] > amount) {
      tempBank[id] -= amount;
    } else {
      delete tempBank[id];
    }
  } else {
    console.error(`Item not found in player bank: ${id}`);
  }
  return tempBank;
};

export const removeBankFromBank = (bank: ItemBank, bankToRemove: ItemBank): ItemBank => {
  let tempBank : ItemBank = { ...bank };
  Object.entries(bankToRemove).forEach((singleItem) => {
    tempBank = removeFromItemBank(tempBank, parseItem(singleItem));
  });
  return tempBank;
};
