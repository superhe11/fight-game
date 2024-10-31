import { Action, ActionType } from "./Action";
import { Unit } from "../models/Unit";
import { Dispatch, SetStateAction } from "react";
import { ActionAnimation } from "../animations/ActionAnimation";
import { AnimationsFactory } from "../animations/AnimationFactory";
const TimeoutValue = 600;

export class AttackAction implements Action {
  type: ActionType = "attack";
  label: string = "Атаковать";

  perform(
    unit: Unit,
    targets: Unit[],
    battlefield: (Unit | null)[][],
    setAnimations: Dispatch<SetStateAction<ActionAnimation[]>>,
  ): void {
    const animationStrategy = AnimationsFactory.createStrategy(this.type);
    animationStrategy.animate(unit, targets, battlefield, setAnimations);

    setTimeout(() => {
      targets.forEach((target) => {
        let damage = unit.attributes.damage!;
        if (target.attributes.isDefending) {
          damage *= 0.5;
          target.attributes.isDefending = false;
        }
        target.attributes.hp -= damage;
        if (target.attributes.hp <= 0) {
          target.attributes.hp = 0;
        }
        console.log(
          `${unit.attributes.name} наносит ${damage} урона по ${target.attributes.name}`,
        );
      });
    }, TimeoutValue);
  }

  getPossibleTargets(unit: Unit, battlefield: (Unit | null)[][]): Unit[] {
    const enemyUnits = unit.getEnemyUnits(battlefield);
    return unit.getPossibleTargets(battlefield, enemyUnits);
  }
}
