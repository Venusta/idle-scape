import { DropTable } from "./dropTable";
import { Monster } from "./Monster";
import { nameToId as name } from "../util/nameToId";

const brewRest = new DropTable()
  .always(name("Saradomin brew(3)"), 3)
  .always(name("Super restore(4)"), 3);

const magicDef = new DropTable()
  .always(name("Super defence(3)"), 3)
  .always(name("Magic potion(3)"), 3);

const gsShard = new DropTable()
  .add(name("Godsword shard 1"), 1)
  .add(name("Godsword shard 2"), 1)
  .add(name("Godsword shard 3"), 1);

const uniques = new DropTable()
  .add(gsShard, 2)
  .add(name("Saradomin sword"), 4)
  .add(name("Saradomin's light"), 2)
  .add(name("Armadyl crossbow"))
  .add(name("Saradomin hilt"))
  .add(name("Coins"), 2, [19500, 20000]);

const dropTable = new DropTable()
  .always(name("Bones"))

  .add(uniques, 3)
  .add(brewRest, 6)
  .add(magicDef, 8)
  .add(name("Prayer potion(4)"), 8)
  .add(name("Diamond"), 8, 6)
  .add(name("Law rune"), 8, [95, 100])
  .add(name("Grimy ranarr weed"), 8, 5)
  .add(name("Ranarr seed"), 8, 2)
  .add(name("Magic seed"))
  .add(name("Coins"), 27, [19500, 20000]) // 27?

  .add(name("Adamant platebody"), 8)
  .add(name("Rune dart"), 8, [35, 40])
  .add(name("Rune kiteshield"), 8)
  .add(name("Rune plateskirt"), 8)
  // https://oldschool.runescape.wiki/w/God_Wars_Dungeon-variant_rare_drop_table
  // .add(God Wars Dungeon-variant Rare Drop Table, 8)
  // .add(God Wars Dungeon-variant Gem Drop Table, 2)

  .tertiary(name("Clue scroll (elite)"), 250)
  .tertiary(name("Pet zilyana"), 5000);

export const testMonster = new Monster({
  name: "Commander Zilyana",
  dropTable,
});
