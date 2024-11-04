import { MeleeUnit } from "../models/UnitTypes/MeleeUnit";
import { UnitAttributes } from "../models/UnitAttributes";
import { Position } from "../models/UnitAttributes";
import { AttackAction } from "../actions/AttackAction";
import { DefendAction } from "../actions/DefendAction";
import { Unit } from "../models/Unit";

class DummyUnit extends Unit {
  constructor() {
    const attributes = new UnitAttributes(
      "Dummy",
      0,
      0,
      0,
      0,
      "",
      "",
      "orange",
      new Position(0, 0),
    );
    super(attributes);
    this.initActions();
  }

  getPossibleTargets(): Unit[] {
    return [];
  }

  initActions(): void {
    this.actions = [];
  }
}

describe("MeleeUnit", () => {
  let unit: MeleeUnit;

  beforeEach(() => {
    const attributes = new UnitAttributes(
      "TestMeleeUnit",
      100,
      100,
      50,
      20,
      "TestMeleeUnit.png",
      "TestMeleeUnit.mp4",
      "red",
      new Position(1, 1),
    );
    unit = new MeleeUnit(attributes);
  });

  it("должен инициализировать действия правильно", () => {
    expect(unit.actions.length).toBe(2);
    expect(unit.actions[0]).toBeInstanceOf(AttackAction);
    expect(unit.actions[1]).toBeInstanceOf(DefendAction);
  });

  it("должен возвращать корректные возможные цели", () => {
    const enemyAttributes = new UnitAttributes(
      "Enemy",
      100,
      100,
      40,
      15,
      "enemy.png",
      "enemy.mp4",
      "orange",
      new Position(1, 0),
    );
    const enemyUnit = new MeleeUnit(enemyAttributes);
    const dummyUnit = new DummyUnit();

    const battlefield: Unit[][] = [
      [enemyUnit, dummyUnit, dummyUnit],
      [dummyUnit, unit, dummyUnit],
    ];

    const possibleTargets = unit.getPossibleTargets(battlefield);
    expect(possibleTargets).toContain(enemyUnit);
  });
});
