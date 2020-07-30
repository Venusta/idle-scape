import { SkillNames } from "../data";
import { LapOptions } from "../../types/types";
import Agility from "../skills/agility";
import Player from "../../model/Player";
import store, { agilityTask } from "../../redux-stuff";

export default class Laps {
  private playerID: number;
  private name: string;
  private amount: number;

  constructor({ playerID, name, amount }: LapOptions) {
    this.playerID = playerID;
    this.name = name;
    this.amount = amount;
  }

  start = ():void => {
    const { playerID, name, amount } = this;
    const player: Player = store.getState().players[playerID];

    const selectedCourse = Agility.courses.find((course) => course.name === name);
    if (!selectedCourse) {
      console.log("Course not found");
      return;
    }
    const {
      name: courseName, exp: courseExp, lapTime, level: courseLevel,
    } = selectedCourse;

    const { level, boost = 0 } = player.skills[SkillNames.Agility];

    if (level + boost < courseLevel) {
      console.log(`Level too low for course: ${courseName}`);
      return;
    }
    console.log(selectedCourse);
    console.log(`${player.name} wants to do ${amount}x laps of course: ${courseName}`);
    console.log(`It will take ${lapTime * amount} seconds`);
    console.log(`The reward will be ${courseExp * amount} ${SkillNames.Agility} exp`);

    const duration = amount * lapTime * 100; // TODO should be 1000
    const expReward = courseExp * amount;
    const skill = SkillNames.Agility;

    store.dispatch(agilityTask({
      playerID, duration, skill, expReward,
    }));
  };
}
