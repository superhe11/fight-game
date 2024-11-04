import { Unit } from "../models/Unit";
import { Dispatch, SetStateAction } from "react";
import { ActionAnimation } from "./ActionAnimation";

export interface IconData {
  iconName: string;
  color: string;
  size: number;
}

export abstract class Animations {
  protected actionType: "attack" | "heal" | "paralyze";
  protected iconData: IconData;

  constructor(actionType: "attack" | "heal" | "paralyze", iconData: IconData) {
    this.actionType = actionType;
    this.iconData = iconData;
  }

  animate(
    _fromUnit: Unit,
    toUnits: Unit[],
    _battlefield: (Unit | null)[][],
    setAnimations: Dispatch<SetStateAction<ActionAnimation[]>>,
  ): void {
    toUnits.forEach((targetUnit) => {
      const animation = new ActionAnimation(
        this.actionType,
        targetUnit,
        this.iconData,
      );
      setAnimations((prevAnimations) => [...prevAnimations, animation]);
    });
  }
}
