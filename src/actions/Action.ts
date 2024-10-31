import { Unit } from "../models/Unit";
import { Dispatch, SetStateAction } from "react";
import { ActionAnimation } from "../animations/ActionAnimation";

export type ActionType =
  | "attack"
  | "aoeAttack"
  | "defend"
  | "heal"
  | "aoeHeal"
  | "paralyze";

export interface Action {
  type: ActionType;
  label: string;
  perform(
    unit: Unit,
    targets: Unit[],
    battlefield: (Unit | null)[][],
    setAnimations: Dispatch<SetStateAction<ActionAnimation[]>>,
  ): void;
  getPossibleTargets(unit: Unit, battlefield: (Unit | null)[][]): Unit[];
}
