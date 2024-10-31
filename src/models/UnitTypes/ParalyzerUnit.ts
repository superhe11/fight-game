import { Unit } from "../Unit";
import { ParalyzeAction } from "../../actions/ParalyzeAction";
import { DefendAction } from "../../actions/DefendAction";

export class ParalyzerUnit extends Unit {
  initActions(): void {
    this.actions = [new ParalyzeAction(), new DefendAction()];
  }

  getPossibleTargets(
    _battlefield: (Unit | null)[][],
    enemyUnits: Unit[],
  ): Unit[] {
    return enemyUnits.filter((unit) => unit.attributes.hp > 0);
  }
}
