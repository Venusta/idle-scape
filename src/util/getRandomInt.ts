export function getRandomInt(min: number, max: number) {
  const tmin = Math.ceil(min);
  const tmax = Math.floor(max) + 1;
  return Math.floor(Math.random() * (tmax - tmin)) + tmin;
}

export default getRandomInt;
