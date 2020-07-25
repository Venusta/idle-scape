import { MonsterOptions } from "../types/types";

export default abstract class Monster {
  public id: number;
  public name: string;

  constructor({ id, name }: MonsterOptions) {
    this.id = id;
    this.name = name;
    // this.aliases = options.aliases ?? [];
    // this.data = monsterData[this.id];
  }
}
