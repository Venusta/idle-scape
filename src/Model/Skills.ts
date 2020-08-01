import Skill from "./Skill";

export default class Skills {
  public attack: Skill;
  public defence: Skill;
  public strength: Skill;
  public hitpoints: Skill;
  public ranged: Skill;
  public prayer: Skill;
  public magic: Skill;
  public cooking: Skill;
  public woodcutting: Skill;
  public fletching: Skill;
  public fishing: Skill;
  public firemaking: Skill;
  public crafting: Skill;
  public smithing: Skill;
  public mining: Skill;
  public herblore: Skill;
  public agility: Skill;
  public thieving: Skill;
  public slayer: Skill;
  public farming: Skill;
  public runecrafting: Skill;
  public hunter: Skill;
  public construction: Skill;

  constructor() {
    this.attack = new Skill();
    this.defence = new Skill();
    this.strength = new Skill();
    this.hitpoints = new Skill(1154);
    this.ranged = new Skill();
    this.prayer = new Skill();
    this.magic = new Skill();
    this.cooking = new Skill();
    this.woodcutting = new Skill();
    this.fletching = new Skill();
    this.fishing = new Skill();
    this.firemaking = new Skill();
    this.crafting = new Skill();
    this.smithing = new Skill();
    this.mining = new Skill();
    this.herblore = new Skill();
    this.agility = new Skill();
    this.thieving = new Skill();
    this.slayer = new Skill();
    this.farming = new Skill();
    this.runecrafting = new Skill();
    this.hunter = new Skill();
    this.construction = new Skill();
  }
}
