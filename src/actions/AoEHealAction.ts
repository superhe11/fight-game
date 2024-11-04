import { Action, ActionType } from "./Action";
import { Unit } from "../models/Unit";
import { Dispatch, SetStateAction } from "react";
import { ActionAnimation } from "../animations/ActionAnimation";
import { AnimationsFactory } from "../animations/AnimationFactory";
const TIMEOUT_VALUE = 600;

export class AoEHealAction implements Action {
  type: ActionType = ActionType.AoeHeal;
  label: string = "Массовое лечение";
  requiresTargetSelection: boolean = false;

  perform(
    unit: Unit,
    targets: Unit[],
    battlefield: Unit[][],
    setAnimations: Dispatch<SetStateAction<ActionAnimation[]>>,
  ): void {
    const animationStrategy = AnimationsFactory.createStrategy(this.type);
    animationStrategy.animate(unit, targets, battlefield, setAnimations);

    setTimeout(() => {
      const healAmount = unit.attributes.damage!;
      targets.forEach((target) => {
        target.attributes.hp = Math.min(
          target.attributes.hp + healAmount,
          target.attributes.maxHp,
        );
        console.log(
          `${unit.attributes.name} исцеляет ${target.attributes.name} на ${healAmount} HP`,
        );
      });
    }, TIMEOUT_VALUE);
  }

  getPossibleTargets(unit: Unit, battlefield: Unit[][]): Unit[] {
    const allyUnits = unit.getAllyUnits(battlefield);
    return allyUnits.filter(
      (ally) =>
        ally.attributes.hp > 0 && ally.attributes.hp < ally.attributes.maxHp,
    );
  }
}
