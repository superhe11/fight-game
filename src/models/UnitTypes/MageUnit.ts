import { Unit } from "../Unit";
import { AoEAttackAction } from "../../actions/AoEAttackAction";
import { DefendAction } from "../../actions/DefendAction";

export class MageUnit extends Unit {
  initActions(): void {
    this.actions = [new AoEAttackAction(), new DefendAction()];
  }

  getPossibleTargets(
    _battlefield: (Unit | null)[][],
    enemyUnits: Unit[],
  ): Unit[] {
    return enemyUnits.filter((unit) => unit.attributes.hp > 0);
  }
}
