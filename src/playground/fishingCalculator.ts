/* eslint-disable max-len */
/*
  * Fishing xp per hour calculation at level 99
  */

const fishies = [
  {
    exp: 80,
    weight: [8, 64],
    name: "Sturgeon",
  },
  {
    exp: 70,
    weight: [16, 96],
    name: "Salmon",
  },
  {
    exp: 50,
    weight: [32, 192],
    name: "Trout",
  },
].sort((a, b) => b.exp - a.exp);

interface FishData {
  name: string;
  caught: number;
  expPerFish: number;
  calculatedChance: number;
}

const calculateWeight = (level: number, [low, high]: number[]) => low + ((level - 1) / 98) * (high - low);

export class FishingSimulation {
  private fishData: {
    exp: number;
    weight: number[];
    name: string;
  }[];

  private catchesPerHour: number;

  constructor() {
    const ticksPerCatch = 5;

    this.catchesPerHour = 6000 / ticksPerCatch;
    this.fishData = fishies;
  }

  run = (level = 99): void => {
    const maxWeight = 255;
    let totalXp = 0;
    const data: FishData[] = [];

    this.fishData.forEach((fish, index) => {
      const { exp, weight, name } = fish;
      let chance = calculateWeight(level, weight) / maxWeight;
      /**
       * Calculated chance to catch this specific fish
       */

      for (let i = 0; i < index; i += 1) {
        /**
         * For every fish before the one we want, we need to check the chance
         * to not get that fish to calculate the true chance for the one we want
         */
        const previousFishChance = fishies[i];

        chance *= (1 - calculateWeight(level, previousFishChance.weight) / maxWeight);
      }
      const caught = Math.floor(chance * this.catchesPerHour);
      const expPerFish = caught * exp;
      totalXp += caught * exp;
      data.push({
        name, caught, expPerFish, calculatedChance: chance,
      });
    });
    console.table(data);

    console.log(`Fishing xp per hour(converted to fish): ${totalXp}`);
  };
}

// let averageXpPerCatch = 0;
// let totalXp = 0;
// const ticksPerCatch = 5;
// const catchesPerHour = (6000) / ticksPerCatch; // here i think?

// console.log(fishies);

// // Plan to calculate xp per hour is to first calculate the average xp for each fish
// // We do this by calculating the chance to catch this fish and then multiplying that by the xp it gives
// // Due to how the game works, if the fish is not the highest level in the fishing pool, we first have to
// // fail the rolls to catch the higher level fish
// fishies.forEach((fish, index) => {
//   // Get data for the fish in question
//   let { chance } = fish;
//   const { exp } = fish; // seriously fuck off

//   // If the fish is not the highest level fish in the pool (index is not 0, if index is 0 then it does
//   // not enter the for loop) then we first have to fail to catch the higher level fish to reach this
//   // fish so we have to take those chances into account.
//   for (let i = 0; i < index; i += 1) {
//     // Get the data for the fishies that are higher level than the fish we're looking at
//     const faildCatch = fishies[i];
//     // Multiply the chance by the chance to FAIL the higher level fish (1 - chance to catch = chance to fail)
//     chance *= (1 - faildCatch.chance);
//   }

//   // At this point we've calculated the final chance to catch the fish having taken into account any higher
//   // level fish we first have to FAIL to catch to reach this fish
//   console.log(chance);
//   // Now it's a simple multiplication of the final chance times the fish's exp reward which we then add to the
//   // total "averageXpPerCatch" so that after this forEach we have a total averageXpPerCatch for this fishing pool
//   averageXpPerCatch += chance * exp;
//   // const variance = 0.05;
//   // const factor = Math.random() * (variance * 2) + (1 - variance); // var*2 + 1-var
//   const totalCaught = Math.floor(chance * catchesPerHour);
//   console.log(`Caught ${totalCaught} ${fish.name}`);
//   totalXp += totalCaught * exp;
// });
// // After we have the total averageXpPerCatch for the fishing pool we can just multiply by the catches per hour to
// // get the experience rate per hour at this fishing pool
// console.log(`Fishing xp per hour: ${averageXpPerCatch * catchesPerHour}`);
// console.log(`Fishing xp per hour(converted to fish): ${totalXp}`);
