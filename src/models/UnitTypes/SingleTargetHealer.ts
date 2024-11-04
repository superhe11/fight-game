import { Unit } from "../Unit";
import { HealAction } from "../../actions/HealAction";
import { DefendAction } from "../../actions/DefendAction";

export class SingleTargetHealer extends Unit {
  initActions(): void {
    this.actions = [new HealAction(), new DefendAction()];
  }

  getPossibleTargets(
    _battlefield: (Unit | null)[][],
    allyUnits: Unit[],
  ): Unit[] {
    return allyUnits.filter(
      (unit) =>
        unit.attributes.hp > 0 && unit.attributes.hp < unit.attributes.maxHp,
    );
  }
}
