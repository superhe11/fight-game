import { Unit } from "../Unit";
import { AttackAction } from "../../actions/AttackAction";
import { DefendAction } from "../../actions/DefendAction";

export class RangeUnit extends Unit {
  initActions(): void {
    this.actions = [new AttackAction(), new DefendAction()];
  }

  getPossibleTargets(
    _battlefield: (Unit | null)[][],
    enemyUnits: Unit[],
  ): Unit[] {
    return enemyUnits.filter((unit) => unit.attributes.hp > 0);
  }
}
