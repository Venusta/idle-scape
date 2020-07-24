import DropTable from "../model/DropTable";

export interface MonsterOptions {
  id: number;
  name: string;
}

export interface DropTableOptions {
  limit?: number;
}

export interface DropTableItemData {
  item: number | DropTable | DropTableItemData[];
  amount: number | number[];
}

export interface SecondaryDropTableItems extends DropTableItemData {
  weight: number;
}

export interface OneInXDropTableItems extends DropTableItemData {
  chance: number;
}

export interface Drop {
  item: number;
  amount: number;
}

export interface DropCollection {
  [key: number]: number;
}
