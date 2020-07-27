/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import React from "react";
import "./App.css";

// import Sidebar from "./Sidebar/Sidebar";
// import Cards from "./Cards/Cards";
// import DropTable from "../Model/DropTable";
// import HerbDropTable from "../constants/subtables/HerbDropTable";
import Player from "../model/Player";
import TestMonster from "../constants/monsters/TestMonster";
import { skillData, derp, getSkillObject } from "../constants/data";

const items = {
  "-2": {
    id: -2,
    name: "Nothing",
  },
  199: {
    id: 199,
    name: "Grimy guam leaf",
    noteable: true,
    stackable: false,
    equipable: false,
    cost: 13,
    lowalch: 5,
    highalch: 7,
  },
  201: {
    id: 201,
    name: "Grimy marrentill",
    noteable: true,
    stackable: false,
    equipable: false,
    cost: 14,
    lowalch: 5,
    highalch: 8,
  },
  203: {
    id: 203,
    name: "Grimy tarromin",
    noteable: true,
    stackable: false,
    equipable: false,
    cost: 15,
    lowalch: 6,
    highalch: 9,
  },
  205: {
    id: 205,
    name: "Grimy harralander",
    noteable: true,
    stackable: false,
    equipable: false,
    cost: 16,
    lowalch: 6,
    highalch: 9,
  },
  207: {
    id: 207,
    name: "Grimy ranarr weed",
    noteable: true,
    stackable: false,
    equipable: false,
    cost: 30,
    lowalch: 12,
    highalch: 18,
  },
  209: {
    id: 209,
    name: "Grimy irit leaf",
    noteable: true,
    stackable: false,
    equipable: false,
    cost: 17,
    lowalch: 6,
    highalch: 10,
  },
  211: {
    id: 211,
    name: "Grimy avantoe",
    noteable: true,
    stackable: false,
    equipable: false,
    cost: 18,
    lowalch: 7,
    highalch: 10,
  },
  213: {
    id: 213,
    name: "Grimy kwuarm",
    noteable: true,
    stackable: false,
    equipable: false,
    cost: 20,
    lowalch: 8,
    highalch: 12,
  },
  215: {
    id: 215,
    name: "Grimy cadantine",
    noteable: true,
    stackable: false,
    equipable: false,
    cost: 22,
    lowalch: 8,
    highalch: 13,
  },
  217: {
    id: 217,
    name: "Grimy dwarf weed",
    noteable: true,
    stackable: false,
    equipable: false,
    cost: 24,
    lowalch: 9,
    highalch: 14,
  },
  219: {
    id: 219,
    name: "Grimy torstol",
    noteable: true,
    stackable: false,
    equipable: false,
    cost: 25,
    lowalch: 10,
    highalch: 15,
  },
  314: {
    id: 314,
    name: "Feather",
    noteable: false,
    stackable: true,
    equipable: false,
    cost: 2,
    lowalch: 0,
    highalch: 1,
  },
  526: {
    id: 526,
    name: "Bones",
    noteable: true,
    stackable: false,
    equipable: false,
    cost: 1,
    lowalch: 0,
    highalch: 0,
  },
  532: {
    id: 532,
    name: "Big bones",
    noteable: true,
    stackable: false,
    equipable: false,
    cost: 1,
    lowalch: 0,
    highalch: 0,
  },
  2138: {
    id: 2138,
    name: "Raw chicken",
    noteable: true,
    stackable: false,
    equipable: false,
    cost: 1,
    lowalch: 0,
    highalch: 0,
  },
  2486: {
    id: 2486,
    name: "Grimy lantadyme",
    noteable: true,
    placeholder: false,
    stackable: false,
    equipable: false,
    cost: 23,
    lowalch: 9,
    highalch: 13,
  },
};

const special = {
  nothing: {
    id: "-2",
  },
  herb: {
    id: "-3",
  },
};

const hillGiantLootTable = {
  always: [
    [532, 1],
  ],
  items: [
    "feather:5",
    "feather:15",
    "nothing",
  ],
};

const chickenLootTable = {
  always: [
    [526, [1, 11]],
    [2138, 1],
  ],
  items: [
    // ID, amount, how many rolls (weight)
    [314, 5, 2],
    [314, 15, 1],
    [special.nothing.id, 0, 1],
    [special.herb.id, 1, 2],
    [special.herb.id, 2, 4],
  ],
};

const herbLootTable = [
  // ID, amount, weight
  [199, 1, 32],
  [201, 1, 24],
  [203, 1, 18],
  [205, 1, 14],
  [207, 1, 11],
  [209, 1, 8],
  [211, 1, 6],
  [213, 1, 5],
  [215, 1, 4],
  [2486, 1, 3],
  [217, 1, 3],
];

// const getLootIndexes = (lootTable) => lootTable.reduce((accum, element, index) => {
//   let weight = parseInt([element[2]], 10);
//   if (index > 0) weight += parseInt(accum[index - 1], 10);
//   accum.push(weight);
//   return accum;
// }, []);

// const getRandomDrop = (lootTable) => {
//   const totalWeight = lootTable.reduce((weightTally, item) => weightTally + item[2], 0);
//   const roll = getRandomInt(1, totalWeight);

//   const lootIndexes = getLootIndexes(lootTable);

//   const drop = [];

//   for (let index = 0; index < lootIndexes.length; index += 1) {
//     if (roll <= lootIndexes[index]) {
//       const [itemID, amount] = lootTable[index];
//       drop.push(itemID, amount);
//       break;
//     }
//   }

//   return drop;
// };

// const getLoot = (lootTable) => {
//   const loot = [];

//   loot.push(...lootTable.always.map((value) => value));

//   const [itemID, amount] = getRandomDrop(lootTable.items);

//   if (itemID === special.herb.id) {
//     for (let index = 0; index < amount; index += 1) {
//       const [herbID, herbAmount] = getRandomDrop(herbLootTable);
//       loot.push([herbID, herbAmount]);
//     }
//   } else {
//     loot.push([itemID, amount]);
//   }

//   return loot.flat();
// };

// const formatDrop = (drop) => drop.map((value) => {
//   const [id, amount] = value;
//   return [items[id].name, amount];
// });

const App = () => {
  // importAll(require.context("../assets/", false, /\.png$/)); // TODO this seems weird
  console.log("Rendered");
  // ID, amount, weight

  // const t = TestMonsterTable;

  // console.table(t.generateDrop());

  const herp = TestMonster;
  // console.log(herp);

  const loot1 = herp.getLoot(10);
  // console.log(loot1);
  // const loot2 = herp.getLoot(100);
  // console.log(loot2);

  // const y = addLootToBank(loot2);

  console.log(derp());
  console.log(getSkillObject());
  

  // const skillShit = skillData();
  // const player = new Player({
  //   id: 1,
  //   name: "yeetus",
  //   skills: skillShit,
  // });
  // console.log(player);

  // console.log(player.getBank());

  // player.addBankToBank(loot1);
  // // player.addBankToBank(loot1);
  // player.removeBankFromBank(loot1);
  // player.addToItemBank({ item: 2048, amount: 1065764500 });
  // player.removeFromItemBank({ item: 4151, amount: 1 });
  // player.removeFromItemBank({ item: 4151, amount: 1 });
  // player.removeFromItemBank({ item: 41531, amount: 1 });
  // console.log(player.getBank());

  return (
    <div className="app">
      {/* <Sidebar />
      <div>
        <Cards />
      </div> */}
    </div>
  );
};

export default App;
