import { Unit } from "../models/Unit";
import { Skeleton } from "../models/units/Skeleton";
import { Centaur } from "../models/units/Centaur";
import { Bandit } from "../models/units/Bandit";
import { ElfArcher } from "../models/units/ElfArcher";
import { SkeletonMage } from "../models/units/SkeletonMage";
import { Archimage } from "../models/units/Archimage";
import { Monk } from "../models/units/Monk";
import { Bishop } from "../models/units/Bishop";
import { Sirena } from "../models/units/Sirena";

export enum UnitName {
  Skeleton = "Skeleton",
  Centaur = "Centaur",
  Bandit = "Bandit",
  ElfArcher = "Elf Archer",
  SkeletonMage = "Skeleton Mage",
  Archimage = "Archimage",
  Monk = "Monk",
  Bishop = "Bishop",
  Sirena = "Sirena",
}

export class UnitFactory {
  static createUnit(name: UnitName): Unit {
    switch (name) {
      case UnitName.Skeleton:
        return new Skeleton();
      case UnitName.Centaur:
        return new Centaur();
      case UnitName.Bandit:
        return new Bandit();
      case UnitName.ElfArcher:
        return new ElfArcher();
      case UnitName.SkeletonMage:
        return new SkeletonMage();
      case UnitName.Archimage:
        return new Archimage();
      case UnitName.Monk:
        return new Monk();
      case UnitName.Bishop:
        return new Bishop();
      case UnitName.Sirena:
        return new Sirena();
      default:
        throw new Error(`Unknown unit type: ${name}`);
    }
  }

  static getUnitNames(): UnitName[] {
    return Object.values(UnitName);
  }
}
