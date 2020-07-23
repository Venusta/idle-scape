/* eslint-disable no-unused-vars */
const imageCache = {};

export const importAll = (r) => {
  // eslint-disable-next-line no-return-assign
  r.keys().forEach((key) => imageCache[key] = r(key));
};

export const asset = (s) => imageCache[`./${s}.png`].default;

export function randomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function getRandomInt(min, max) {
  const tmin = Math.ceil(min);
  const tmax = Math.floor(max) + 1;
  return Math.floor(Math.random() * (tmax - tmin)) + tmin;
}

export function rollForOneIn(upperLimit) {
  return getRandomInt(1, upperLimit) === 1;
}

export const addToLootTable = (loot, item) => {
  const { item: id, amount } = item;
  const tempArray = loot;
  if (tempArray[id]) {
    tempArray[id] += amount;
  } else {
    tempArray[id] = amount;
  }
  return tempArray;
};

const lang = "en";
const timeWarp = 1; // speed up time, default: 1
const eorzeaTimeFactor = 20.571428571428573 * timeWarp; // 60 * 24 / 70

export const localToEorzea = (date) => new Date(date.getTime() * eorzeaTimeFactor);
// new Date(date.getTime() * eorzeaTimeFactor + (date.getTimezoneOffset() - 60) * 60 * 1000);

export const eorzeaToLocal = (date) => new Date(date.getTime() / eorzeaTimeFactor);

export const formatTimes = (times) => times.map((value) => `${value}:00`).join(" & ");

export const getTranslation = (object) => object[lang] || object.en;

export const formatTime = (date) => {
  const secs = date.getSeconds().toString().padStart(2, "0");
  const mins = date.getMinutes().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  return `${hours}:${mins}`;
};

const timeTillSpawn = (spawnHour) => {
  const eorzeaTime = localToEorzea(new Date());
  const eorzeaHour = eorzeaTime.getHours();

  // hours = (time1 - time2 + 24) % 24;

  // if (spawnHour >= eorzeaHour + 2) {
  //   console.log(`sh: ${spawnHour} eh: ${eorzeaHour}`);
  //   return 0;
  // }

  return (spawnHour - eorzeaHour + 24) % 24;
};

export const eMinsTillNextSpawn = (spawnTimes, uptime) => {
  const eorzeaTime = localToEorzea(new Date());
  const eorzeaHour = 16; // eorzeaTime.getHours();
  const eorzeaMin = 1; // eorzeaTime.getMinutes();
  const minsTill = 60 - eorzeaMin;

  let smallestTimeDiff = Infinity;
  let nextTime;

  // eslint-disable-next-line no-restricted-syntax
  for (const spawnTime of spawnTimes) {
    let timeDiff = Infinity;

    if (eorzeaHour === spawnTime && spawnTimes.length === 1) {
      return 24 * 60 - eorzeaMin;
    }

    if (eorzeaHour < spawnTime) {
      timeDiff = spawnTime - eorzeaHour;
    }

    if (eorzeaHour > spawnTime) {
      timeDiff = 24 - eorzeaHour + spawnTime;
    }

    if (timeDiff < smallestTimeDiff) {
      smallestTimeDiff = timeDiff;
      nextTime = spawnTime;
    }
  }

  // if (smallestTimeDiff === Infinity) console.log(`eh: ${eorzeaHour} em: ${eorzeaMin}`);

  if (smallestTimeDiff > 0) {
    return ((smallestTimeDiff - 1) * 60) + minsTill;
  }
  return minsTill;
};
