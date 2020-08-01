import { Player } from "../types/types";
import { initialSkills } from "./Skills";

interface PlayerOptions {
  id: number;
  name: string;
}

const player = ({ id, name }: PlayerOptions): Player => {
  console.log("Player Remake!");
  const skills = initialSkills;
  const bank = {
    995: 100,
    4151: 200,
    1024: 3,
  };
  const inventory = { // TODO needs to be array i think if we even use it
    1024: 1,
  };

  const equipment = {
    head: 2619,
    body: 2615,
    legs: 2617,
    feet: -2,
    hands: -2,
    cape: -2,
    weapon: 4151,
    shield: 8845,
    ammo: -2,
    ring: -2,
    neck: -2,
  };

  return {
    id,
    name,
    skills,
    bank,
    inventory,
    equipment,
  };
};

export default player;
