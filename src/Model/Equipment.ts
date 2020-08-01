/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import store from "../redux-stuff";
import {
  CompleteItemData, EquipmentData, EquipableRequirements, WeaponData, EquipmentSlots, EquipmentBonuses,
  EquipmentSlotNames, Player, AttackType, AttackStyle,
} from "../types/types";
import rawBodySlotData from "../assets/items-json-slot/items-body.json";
import rawAmmoSlotData from "../assets/items-json-slot/items-ammo.json";
import rawCapeSlotData from "../assets/items-json-slot/items-cape.json";
import rawFeetSlotData from "../assets/items-json-slot/items-feet.json";
import rawHandsSlotData from "../assets/items-json-slot/items-hands.json";
import rawHeadSlotData from "../assets/items-json-slot/items-head.json";
import rawLegsSlotData from "../assets/items-json-slot/items-legs.json";
import rawNeckSlotData from "../assets/items-json-slot/items-neck.json";
import rawRingSlotData from "../assets/items-json-slot/items-ring.json";
import rawShieldSlotData from "../assets/items-json-slot/items-shield.json";
import rawWeaponSlotData from "../assets/items-json-slot/items-weapon.json";

const bodySlotData = rawBodySlotData as { [id: string]: CompleteItemData };
const ammoSlotData = rawAmmoSlotData as { [id: string]: CompleteItemData };
const capeSlotData = rawCapeSlotData as { [id: string]: CompleteItemData };
const feetSlotData = rawFeetSlotData as { [id: string]: CompleteItemData };
const handsSlotData = rawHandsSlotData as { [id: string]: CompleteItemData };
const headSlotData = rawHeadSlotData as { [id: string]: CompleteItemData };
const legsSlotData = rawLegsSlotData as { [id: string]: CompleteItemData };
const neckSlotData = rawNeckSlotData as { [id: string]: CompleteItemData };
const ringSlotData = rawRingSlotData as { [id: string]: CompleteItemData };
const shieldSlotData = rawShieldSlotData as { [id: string]: CompleteItemData };
const weaponSlotData = rawWeaponSlotData as { [id: string]: CompleteItemData };

export default class Equipment {
  private playerEquipment: EquipmentSlots;
  public equipmentBonuses: EquipmentBonuses;

  constructor(player: Player) {
    this.playerEquipment = player.equipment;
    this.equipmentBonuses = this.calculateEquipmentBonuses();
  }

  private calculateEquipmentBonuses = (): EquipmentBonuses => {
    const bonuses: EquipmentBonuses = {
      attack_stab: 0,
      attack_slash: 0,
      attack_crush: 0,
      attack_magic: 0,
      attack_ranged: 0,
      defence_stab: 0,
      defence_slash: 0,
      defence_crush: 0,
      defence_magic: 0,
      defence_ranged: 0,
      melee_strength: 0,
      ranged_strength: 0,
      magic_damage: 0,
      prayer: 0,
    };

    Object.entries(this.playerEquipment).forEach(([slot, itemID]: [string, number]) => {
      const slotItemData = this.getItemDataForSlot(slot as EquipmentSlotNames);
      if (slotItemData[itemID] === undefined) return;

      const slotEquipmentData = slotItemData[itemID].equipment;
      if (slotEquipmentData === null) return;

      Object.entries(slotEquipmentData).forEach(([key, value]) => {
        if (Object.prototype.hasOwnProperty.call(bonuses, key)) {
          bonuses[key as keyof EquipmentBonuses] += value;
        }
      });
    });
    console.log(bonuses);

    return bonuses;
  };

  private getItemDataForSlot = (slot: EquipmentSlotNames): { [id: string]: CompleteItemData } => {
    switch (slot) {
      case EquipmentSlotNames.Body:
        return bodySlotData;
      case EquipmentSlotNames.Ammo:
        return ammoSlotData;
      case EquipmentSlotNames.Cape:
        return capeSlotData;
      case EquipmentSlotNames.Feet:
        return feetSlotData;
      case EquipmentSlotNames.Hands:
        return handsSlotData;
      case EquipmentSlotNames.Head:
        return headSlotData;
      case EquipmentSlotNames.Legs:
        return legsSlotData;
      case EquipmentSlotNames.Neck:
        return neckSlotData;
      case EquipmentSlotNames.Ring:
        return ringSlotData;
      case EquipmentSlotNames.Shield:
        return shieldSlotData;
      case EquipmentSlotNames.Weapon:
        return weaponSlotData;
      default:
        console.error("wtf");
        return {} as { [id: string]: CompleteItemData };
    }
  };

  public getAttackType = (attackStyle: AttackStyle): AttackType => {
    const weaponID = this.playerEquipment[EquipmentSlotNames.Weapon];
    const weaponData = weaponSlotData[weaponID].weapon;
    const stances = weaponData?.stances;
    const attackType = stances?.find((stance) => stance.attack_style === attackStyle)?.attack_type;
    if (attackType === null || attackType === undefined) {
      console.error("No attack type could be determined.");
      return AttackType.Crush;
    }
    return attackType;
  };
}
