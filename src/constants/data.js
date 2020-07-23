import { v1 as uuid } from "uuid";

/* eslint-disable no-unused-vars */
const jobs = {
  botany: "btn",
  mining: "min",
  fishing: "fsh",
};

const scrips = {
  yellow: "yellow",
  white: "white",
};

const teleports = {
  lydhaLran: {
    en: "Lydha Lran",
    jp: "リダ・ラーン",
  },
  tomra: {
    en: "Tomra",
    jp: "トメラの村",
  },
  theOndoCups: {
    en: "The Ondo Cups",
    jp: "オンドの潮溜まり",
  },
  theInnatJourneysHead: {
    en: "The Inn at Journey's Head",
    jp: "旅立ちの宿",
  },
  slitherbough: {
    en: "Slitherbough",
  },
  fortJobb: {
    en: "Fort Jobb",
  },
  theMacarensesAngle: {
    en: "The Macarenses Angle",
  },
  twine: {
    en: "Twine",
  },
};

const zones = {
  ilMheg: "Il Mheg",
  kholusia: "Kholusia",
  theTempest: "The Tempest",
  amhAraeng: "Amh Araeng",
  theRaktikaGreatwood: "The Rak'tika Greatwood",
  lakeland: "Lakeland",
};

const sands = {
  agedeep: {
    suffix: "21234",
    suffixName: "Agedeep Aethersand",
  },
};

const nodeType = {
  unspoiled: "Unspoiled",
  legendary: "Legendary",
};

const nodeData = [
  {
    id: uuid(),
    node: [
      {
        name: "Beryllium Ore",
        icon: "21455",
      },
      {
        name: "Prismstone",
        icon: "21232",
        scrip: scrips.white,
      },
    ],
    job: jobs.mining,
    zone: zones.ilMheg,
    teleport: teleports.lydhaLran,
    type: nodeType.legendary,
    stars: 1,
    pos: [30, 21],
    times: [4, 16],
    uptime: 120,
    patch: 5.0,
  },
  {
    id: uuid(),
    node: [
      // {
      //   name: "Shade Quartz",
      //   icon: "21462",
      //   ...sands.agedeep,
      // },
      {
        name: "Shade Quartz",
        icon: "21462",
        suffix: "21234",
        suffixName: "Agedeep Aethersand",
      },
      // {
      //   name: "Fire Cluster",
      //   icon: "20013",
      // },
    ],
    job: jobs.mining,
    zone: zones.kholusia,
    teleport: teleports.tomra,
    pos: [22, 18],
    times: [16],
    uptime: 240,
    patch: 5.0,
  },
  {
    id: uuid(),
    node: [
      {
        name: "Raw Onyx",
        icon: "21231",
        suffix: scrips.white,
      },
    ],
    job: jobs.mining,
    zone: zones.theTempest,
    teleport: teleports.theOndoCups,
    pos: [15, 21],
    times: [12, 0],
    uptime: 120,
    patch: 5.0,
  },
  {
    id: uuid(),
    node: [
      {
        name: "Broad Beans",
        icon: "25353",
        suffix: scrips.yellow,
      },
    ],
    job: jobs.botany,
    zone: zones.ilMheg,
    teleport: teleports.lydhaLran,
    pos: [25, 36],
    times: [12, 0],
    uptime: 120,
    patch: 5.0,
  },
  {
    id: uuid(),
    node: [
      {
        name: "Duskblooms",
        icon: "25022",
      },
    ],
    job: jobs.botany,
    zone: zones.amhAraeng,
    teleport: teleports.theInnatJourneysHead,
    pos: [32, 33],
    times: [4, 16],
    uptime: 120,
    patch: 5.0,
  },
  {
    id: uuid(),
    node: [
      {
        name: "SandalWood Log",
        icon: "22401",
        suffix: scrips.white,
      },
      {
        name: "SandalWood Sap",
        icon: "22638",
      },
    ],
    job: jobs.botany,
    zone: zones.theRaktikaGreatwood,
    teleport: teleports.slitherbough,
    pos: [24, 36],
    times: [2, 14],
    uptime: 120,
    patch: 5.0,
  },
  {
    id: uuid(),
    node: [
      {
        name: "Ethereal Cocoon",
        icon: "21661",
        suffix: scrips.white,
      },
    ],
    job: jobs.botany,
    zone: zones.lakeland,
    teleport: teleports.fortJobb,
    pos: [26, 11],
    times: [8, 20],
    uptime: 120,
    patch: 5.0,
  },
  {
    id: uuid(),
    node: [
      {
        name: "Purpure Shell Chip",
        icon: "21469",
      },
    ],
    job: jobs.mining,
    zone: zones.theTempest,
    teleport: teleports.theMacarensesAngle,
    pos: [34, 31],
    times: [6, 18],
    uptime: 120,
    patch: 5.0,
  },
  {
    id: uuid(),
    node: [
      {
        name: "Ashen Alumen",
        icon: "22604",
      },
    ],
    job: jobs.mining,
    zone: zones.amhAraeng,
    teleport: teleports.twine,
    pos: [20, 8],
    times: [10, 22],
    uptime: 120,
    patch: 5.0,
  },
];

export default nodeData;
