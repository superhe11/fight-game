import { Unit } from "../models/Unit";
import { IconData } from "./Animation";

export class ActionAnimation {
  type: "attack" | "heal" | "paralyze";
  targetUnit: Unit;
  iconData: IconData;

  constructor(
    type: "attack" | "heal" | "paralyze",
    targetUnit: Unit,
    iconData: IconData,
  ) {
    this.type = type;
    this.targetUnit = targetUnit;
    this.iconData = iconData;
  }
}
