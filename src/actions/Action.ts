import { Unit } from "../models/Unit";
import { Dispatch, SetStateAction } from "react";
import { ActionAnimation } from "../animations/ActionAnimation";

export enum ActionType {
  Attack = "attack",
  AoeAttack = "aoeAttack",
  Defend = "defend",
  Heal = "heal",
  AoeHeal = "aoeHeal",
  Paralyze = "paralyze",
}

export interface Action {
  type: ActionType;
  label: string;
  requiresTargetSelection: boolean;
  perform(
    unit: Unit,
    targets: Unit[],
    battlefield: (Unit | null)[][],
    setAnimations: Dispatch<SetStateAction<ActionAnimation[]>>,
  ): void;
  getPossibleTargets(unit: Unit, battlefield: (Unit | null)[][]): Unit[];
}
