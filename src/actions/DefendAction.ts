import { Action, ActionType } from "./Action";
import { Unit } from "../models/Unit";
import { Dispatch, SetStateAction } from "react";
import { ActionAnimation } from "../animations/ActionAnimation";

export class DefendAction implements Action {
  type: ActionType = "defend";
  label: string = "Защищаться";

  perform(
    unit: Unit,
    _targets: Unit[],
    _battlefield: (Unit | null)[][],
    _setAnimations: Dispatch<SetStateAction<ActionAnimation[]>>,
  ): void {
    unit.attributes.isDefending = true;
    console.log(`${unit.attributes.name} становится в защитную стойку`);
  }

  getPossibleTargets(_unit: Unit, _battlefield: (Unit | null)[][]): Unit[] {
    return [];
  }
}
