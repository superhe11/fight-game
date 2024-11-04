import { Unit } from "../Unit";
import { AoEHealAction } from "../../actions/AoEHealAction";
import { DefendAction } from "../../actions/DefendAction";

export class MassHealer extends Unit {
  initActions(): void {
    this.actions = [new AoEHealAction(), new DefendAction()];
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
