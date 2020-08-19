export const levelToExp = (lvl: number): number => {
  let exp = 0;
  for (let index = 1; index < lvl; index += 1) {
    exp += Math.floor(index + 300 * (2 ** (index / 7)));
  }
  return Math.floor(exp / 4);
};
