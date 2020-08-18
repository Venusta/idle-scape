import rawSearchData from "../assets/mini-item-search-data.json";

const searchData = rawSearchData as Record<string, number>;

const nameToId = (item: string | number): number => {
  if (typeof item === "number") {
    return item;
  }
  const found = searchData[item];
  if (found) {
    return found;
  }
  console.error(`${item} not found, check your spelling or that the item exists`);
  return 0;
};

export default nameToId;
