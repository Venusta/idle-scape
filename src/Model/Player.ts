import { Player } from "../types/types";
import skills from "./Skills";

interface PlayerOptions {
  id: number;
  name: string;
}

const player = ({ id, name }: PlayerOptions): Player => {
  console.log("Player Remake!");
  const bank = {
    995: 100000,
    50: 5,
    101: 300,
    201: 40,
    301: 50,
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
    skills: skills(),
    bank,
    equipment,
  };
};

export default player;
