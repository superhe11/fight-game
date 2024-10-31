import { Action, ActionType } from "./Action";
import { Unit } from "../models/Unit";
import { Dispatch, SetStateAction } from "react";
import { ActionAnimation } from "../animations/ActionAnimation";
import { AnimationsFactory } from "../animations/AnimationFactory";
const TimeoutValue = 600;

export class ParalyzeAction implements Action {
  type: ActionType = "paralyze";
  label: string = "Парализовать";

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
        target.attributes.isParalyzed = true;
        console.log(
          `${unit.attributes.name} парализует ${target.attributes.name}`,
        );
      });
    }, TimeoutValue);
  }

  getPossibleTargets(unit: Unit, battlefield: (Unit | null)[][]): Unit[] {
    const enemyUnits = unit.getEnemyUnits(battlefield);
    return enemyUnits.filter((enemy) => enemy.attributes.hp > 0);
  }
}
