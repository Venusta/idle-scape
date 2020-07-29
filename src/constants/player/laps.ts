import { SkillNames } from "../data";
import { LapOptions } from "../../types/types";
import Agility from "../skills/agility";
import Player from "../../model/Player";
import store, { agilityTask } from "../../redux-stuff";

export default class Laps {
  private player: Player;
  private name: string;
  private amount: number;

  constructor({ player, name, amount }: LapOptions) {
    this.player = player;
    this.name = name;
    this.amount = amount;
  }

  start = ():void => {
    const selectedCourse = Agility.courses.find((course) => course.name === this.name);
    if (!selectedCourse) {
      console.log("Course not found");
      return;
    }
    const { level, boost = 0 } = this.player.skills[SkillNames.Agility];
    if (level + boost < selectedCourse.level) {
      console.log(`Level too low for course: ${selectedCourse.name}`);
      return;
    }
    const { name, exp, lapTime } = selectedCourse;
    console.log(selectedCourse);
    console.log(`${this.player.name} wants to do ${this.amount}x laps of course: ${name}`);
    console.log(`It will take ${lapTime * this.amount} seconds`);
    console.log(`The reward will be ${exp * this.amount} ${SkillNames.Agility} exp`);

    const duration = this.amount * lapTime * 100; // 1000
    // console.log(`${duration}`);

    store.dispatch(agilityTask({ duration }));
    console.log(store.getState().player);

    // new TimedTask().startTimer(5000, this.finishTask);
    // new TimedTask().startTimer(2000, this.finishTask);
    // this.finishTask();
  };

  finishTask = (): void => {
    console.log("task finished");
    console.log(this.player);

    // give player xp and whatever else
  };
}
