// import rawIconData from "../assets/icons/icons-items-complete.json"; // be prepared for lag
import rawIconData from "../assets/icons/icons-items-mini.json";

export const iconData = rawIconData as { [id: number]: string };

export const getIcon = (id: number): string => { // TODO record imgs not found
  if (iconData[id]) {
    return iconData[id];
  }
  // console.log(`img with id ${id} not found.`);
  return iconData[4151];
};
