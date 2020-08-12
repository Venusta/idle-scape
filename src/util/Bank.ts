import { ItemData } from "../types/types";

const parseItem = (singleItem: [string, number]): ItemData => {
  const [itemID, amount] = singleItem;
  const item = parseInt(itemID, 10);
  return { item, amount };
};

export const addToItemBank = (bank: ItemData[], itemToBeAdded: ItemData): ItemData[] => {
  const tempBank = [...bank];

  const index = tempBank.findIndex((itemInBank) => itemInBank.item === itemToBeAdded.item);

  if (index !== -1) {
    tempBank[index] = {
      ...tempBank[index],
      amount: tempBank[index].amount + itemToBeAdded.amount,
    };
  } else {
    tempBank.push(itemToBeAdded);
  }

  return tempBank;
};
/**
 * merges two sets of banks (ItemData[])
 * @param bank - the bank of which you want to preserve the order
 * @param bankToAdd - the bank you want to add to the first bank
 */
export const addBankToBank = (bank: ItemData[], bankToAdd: ItemData[]): ItemData[] => {
  let tempBank = [...bank];

  bankToAdd.forEach((itemToBeAdded) => {
    tempBank = addToItemBank(tempBank, itemToBeAdded);
  });

  return tempBank;
};

export const removeFromItemBank = (bank: ItemData[], itemToBeRemoved: ItemData): ItemData[] => {
  const tempBank = [...bank];

  const index = tempBank.findIndex((itemInBank) => itemInBank.item === itemToBeRemoved.item);

  if (index !== -1) {
    if (bank[index].amount > itemToBeRemoved.amount) {
      tempBank[index] = {
        ...tempBank[index],
        amount: tempBank[index].amount - itemToBeRemoved.amount,
      };
    } else {
      tempBank.splice(index, 1);
    }
  } else {
    console.error(`Item not found in player bank: ${itemToBeRemoved.item}`);
  }

  return tempBank;
};

export const removeBankFromBank = (bank: ItemData[], bankToRemove: ItemData[]): ItemData[] => {
  let tempBank = [...bank];

  bankToRemove.forEach((itemToBeRemoved) => {
    tempBank = removeFromItemBank(tempBank, itemToBeRemoved);
  });

  return tempBank;
};
