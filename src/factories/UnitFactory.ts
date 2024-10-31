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

export class UnitFactory {
  static createUnit(name: string): Unit {
    switch (name) {
      case "Skeleton":
        return new Skeleton();
      case "Centaur":
        return new Centaur();
      case "Bandit":
        return new Bandit();
      case "Elf Archer":
        return new ElfArcher();
      case "Skeleton Mage":
        return new SkeletonMage();
      case "Archimage":
        return new Archimage();
      case "Monk":
        return new Monk();
      case "Bishop":
        return new Bishop();
      case "Sirena":
        return new Sirena();
      default:
        throw new Error(`Unknown unit type: ${name}`);
    }
  }

  static getUnitNames(): string[] {
    return [
      "Skeleton",
      "Centaur",
      "Bandit",
      "Elf Archer",
      "Skeleton Mage",
      "Archimage",
      "Monk",
      "Bishop",
      "Sirena",
    ];
  }
}
