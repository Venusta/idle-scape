import { SkillNames } from "../data";
import { LapOptions } from "../../types/types";
import Agility from "../skills/agility";
import Player from "../../model/Player";

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
    const { name, exp } = selectedCourse;
    console.log(selectedCourse);
    console.log(`${this.player.name} wants to do ${this.amount}x laps of course: ${name}`);
    console.log(`The reward will be ${exp * this.amount} exp`);
  };
}
