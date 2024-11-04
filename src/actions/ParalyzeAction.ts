import { Action, ActionType } from "./Action";
import { Unit } from "../models/Unit";
import { Dispatch, SetStateAction } from "react";
import { ActionAnimation } from "../animations/ActionAnimation";
import { AnimationsFactory } from "../animations/AnimationFactory";
const TIMEOUT_VALUE = 600;

export class ParalyzeAction implements Action {
  type: ActionType = ActionType.Paralyze;
  label: string = "Парализовать";
  requiresTargetSelection: boolean = true;

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
        target.attributes.isParalyzed = true;
        console.log(
          `${unit.attributes.name} парализует ${target.attributes.name}`,
        );
      });
    }, TIMEOUT_VALUE);
  }

  getPossibleTargets(unit: Unit, battlefield: Unit[][]): Unit[] {
    const enemyUnits = unit.getEnemyUnits(battlefield);
    return enemyUnits.filter((enemy) => enemy.attributes.hp > 0);
  }
}
