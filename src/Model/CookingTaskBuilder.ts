/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
import { CookingTaskOptions } from "../types/types";
import TaskBuilder from "./TaskBuilder";

interface TaskBuilderOptions {
  name: string;
}

export default class CookingTaskBuilder extends TaskBuilder {
  private stopBurnLevel: number;
  private stopBurnGauntlets: number;

  constructor(options: TaskBuilderOptions) {
    super(options);
    this.stopBurnLevel = 1;
    this.stopBurnGauntlets = 1;
  }

  /**
 * @param level at which you stop burning
 */
  stopBurn = (level: number): this => {
    this.stopBurnLevel = level;
    return this;
  };

  /**
 * @param level at which you stop burning with cooking gauntlets
 */
  gauntlets = (level: number): this => {
    this.stopBurnGauntlets = level;
    return this;
  };

  /**
 * finalises and returns a task
 * @param duration how long the task should take in seconds
 */

  finalise = (duration = 0): CookingTaskOptions => {
    const {
      name, requirements, rewards, fails, stopBurnLevel, stopBurnGauntlets,
    } = this;

    return {
      name,
      requirements,
      rewards,
      duration,
      fails,
      stopBurnLevel,
      stopBurnGauntlets,
    };
  };
}
