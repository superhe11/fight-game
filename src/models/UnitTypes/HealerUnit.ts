import { Unit } from "../Unit";

export abstract class HealerUnit extends Unit {
  getPossibleTargets(
    _battlefield: (Unit | null)[][],
    allyUnits: Unit[],
  ): Unit[] {
    return allyUnits.filter(
      (unit) =>
        unit.attributes.hp > 0 && unit.attributes.hp < unit.attributes.maxHp,
    );
  }

  abstract performAction(target: Unit | Unit[]): void;
}
