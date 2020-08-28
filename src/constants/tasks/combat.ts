/* eslint-disable max-len */

import {
  TaskInputOptions, CharacterState, AttackStyle,
} from "../../types/types";
import { TaskDerpThing } from "../../slices/task";
import { selectCharacter } from "../../selectors";
import { chicken } from "../monsters/Chicken";
import { CombatSimulator } from "../../model/CombatSimulator";
import { store } from "../../redux-stuff";

const selectMonster = chicken;

export const combatTask = ({ characterId, taskName, amount }: TaskInputOptions): TaskDerpThing | false => {
  const character: CharacterState = selectCharacter(store.getState(), characterId);
  const { name: characterName, skills, bank } = character;

  const simulator = new CombatSimulator(selectMonster, characterId, AttackStyle.accurate, {});
  const { killcount, rewards, ticks } = simulator.simulate();

  const type = "combat";
  const info = {
    name: taskName,
    amount: killcount,
  };
  const duration = (ticks * 600) * 0.001;
  console.log(`Task should take ${(duration) / 1000} seconds`);

  const taskObj = {
    characterId,
    duration,
    type,
    info,
    reward: rewards,
  };

  return taskObj;
};
