import { DropTable } from "../../model/DropTable";
import { SimpleMonster } from "../../model/SimpleMonster";

const dropTable = new DropTable(({}))
  .always(526, [1, 11])
  .always(2138, 1);

export const chicken = new SimpleMonster({
  id: 1,
  name: "Chicken",
  dropTable,
});
