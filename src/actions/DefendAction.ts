import { Action, ActionType } from "./Action";
import { Unit } from "../models/Unit";

export class DefendAction implements Action {
  type: ActionType = ActionType.Defend;
  label: string = "Защищаться";
  requiresTargetSelection: boolean = false;

  perform(unit: Unit): void {
    unit.attributes.isDefending = true;
    console.log(`${unit.attributes.name} становится в защитную стойку`);
  }

  getPossibleTargets(): Unit[] {
    return [];
  }
}
