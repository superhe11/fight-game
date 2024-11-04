import { Action, ActionType } from "./Action";
import { Unit } from "../models/Unit";
import { Dispatch, SetStateAction } from "react";
import { ActionAnimation } from "../animations/ActionAnimation";
import { AnimationsFactory } from "../animations/AnimationFactory";

const TIMEOUT_VALUE = 600;

export class AoEAttackAction implements Action {
  type: ActionType = ActionType.AoeAttack;
  label: string = "Массовая атака";
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
    }, TIMEOUT_VALUE);
  }

  getPossibleTargets(unit: Unit, battlefield: Unit[][]): Unit[] {
    const enemyUnits = unit.getEnemyUnits(battlefield);
    return enemyUnits.filter((enemy) => enemy.attributes.hp > 0);
  }
}
