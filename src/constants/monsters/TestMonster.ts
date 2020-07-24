import DropTable from "../../model/DropTable";
import HerbDropTable from "../subtables/HerbDropTable";
import SimpleMonster from "../../model/SimpleMonster";

const TestMonsterHerbTable = new DropTable()
  .add(HerbDropTable, 1, 11)
  .add(HerbDropTable, 2, 11)
  .add(HerbDropTable, 3, 4);

const TestMonsterTable = new DropTable(({ limit: 6 }))
  .always(526, [1, 11])
  .always(2138, 1)

  .add([[532, 1], [526, 1]], 8345, 1)
  .add([[532, 3], [526, 1]], 999, 1)

  .add(TestMonsterHerbTable, 1, 1)
  .add(314, 5, 2)
  .add(314, 15, 1)

  .oneInX(4151, 1, 400)
  .oneInX(2000, 1, 200)

  .tertiary(999, 1, 10)
  .tertiary(333, 1, 10);

export default new SimpleMonster({
  id: 1,
  name: "Test Monster",
  dropTable: TestMonsterTable,
});
