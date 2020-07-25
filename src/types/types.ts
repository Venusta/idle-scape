export interface MonsterOptions {
  id: number;
  name: string;
}

export interface PlayerOptions {
  id: number;
  name: string;
}

export type ItemData = {
  item: number;
  amount: number;
};

export type ItemStringData = {
  item: string;
  amount: number;
};

export type Item = [number, number];

export interface ItemBank {
  [key: number]: number;
}
