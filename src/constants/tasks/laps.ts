import {
  LapOptions, SkillsStats, SkillName, ItemBank, EquipmentSlots,
} from "../../types/types";
import Agility from "../skills/agility";
import store, { task } from "../../redux-stuff";
import { SkillNames } from "../data";

type SkillReq = { [Key in SkillName]?: number; };

interface TaskRequirements {
  skills?: SkillReq
  items?: ItemBank
  equipment?: Partial<EquipmentSlots>
}

const requirements: TaskRequirements = {
  skills: {
    [SkillNames.agility]: 1,
    [SkillNames.slayer]: 2,
  },
  equipment: {
    weapon: 4151,
  },
  items: {
    995: 100,
  },
};

export default class Laps {
  private playerID: string;
  private name: string;
  private amount: number;
  private playerName: string;
  private playerSkills: SkillsStats;

  constructor({ playerID, name, amount }: LapOptions) {
    this.playerID = playerID;
    this.name = name;
    this.amount = amount;
    this.playerName = store.getState().characters.names[playerID];
    this.playerSkills = store.getState().characters.skills[playerID];
  }

  hasReqs = (selectedCourse: any): boolean => {
    console.log("yeet");

    console.log(selectedCourse.requirements);

    console.log(this.playerSkills);

    return true;
  };

  start = ():void => {
    const { playerID, name, amount } = this;
    const playerName = store.getState().characters.names[playerID];
    const playerSkills = store.getState().characters.skills[playerID];

    const selectedCourse = Agility.courses.find((course) => course.name === name);
    if (!selectedCourse) {
      console.log("Course not found");
      return;
    }
    const {
      name: courseName, exp: courseExp, lapTime, requirements,
    } = selectedCourse;

    const { level, boost = 0 } = playerSkills[SkillNames.agility];

    if (!this.hasReqs(selectedCourse)) {
      console.log(`${playerName}'s ${SkillNames.agility} level too low for course: ${courseName}`);
      return;
    }

    console.log(selectedCourse);
    console.log(`${playerName} wants to do ${amount}x laps of course: ${courseName}`);
    console.log(`It will take ${lapTime * amount} seconds`);
    console.log(`The reward will be ${courseExp * amount} ${SkillNames.agility} exp`);

    const duration = amount * lapTime * 100; // TODO should be 1000
    const reward = {
      exp: {
        agility: courseExp * amount,
        strength: courseExp * 2 * amount,
      },
      items: {
        4151: 1 * amount,
        995: 12 * amount,
      },
    };
    const skill = SkillNames.agility;
    const type = "Agility-Laps";
    const info = {
      name: courseName,
      amount,
    };

    const agilityTask = {
      playerID,
      duration,
      type,
      info,
      skill,
      reward,
    };

    store.dispatch(task(agilityTask));
  };
}
