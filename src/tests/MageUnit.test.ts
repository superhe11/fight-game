import { MageUnit } from "../models/UnitTypes/MageUnit";
import { UnitAttributes } from "../models/UnitAttributes";
import { Position } from "../models/UnitAttributes";
import { AoEAttackAction } from "../actions/AoEAttackAction";
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

describe("MageUnit", () => {
  let unit: MageUnit;

  beforeEach(() => {
    const attributes = new UnitAttributes(
      "TestMageUnit",
      70,
      70,
      45,
      30,
      "TestMageUnit.png",
      "TestMageUnit.mp4",
      "red",
      new Position(0, 1),
    );
    unit = new MageUnit(attributes);
  });

  it("должен инициализировать действия правильно", () => {
    expect(unit.actions.length).toBe(2);
    expect(unit.actions[0]).toBeInstanceOf(AoEAttackAction);
    expect(unit.actions[1]).toBeInstanceOf(DefendAction);
  });

  it("должен возвращать корректные возможные цели для массовой атаки", () => {
    const enemyAttributes1 = new UnitAttributes(
      "Enemy1",
      50,
      50,
      30,
      15,
      "enemy1.png",
      "enemy1.mp4",
      "orange",
      new Position(1, 0),
    );
    const enemyAttributes2 = new UnitAttributes(
      "Enemy2",
      60,
      60,
      35,
      20,
      "enemy2.png",
      "enemy2.mp4",
      "orange",
      new Position(2, 0),
    );

    const enemyUnit1 = new MageUnit(enemyAttributes1);
    const enemyUnit2 = new MageUnit(enemyAttributes2);
    const dummyUnit = new DummyUnit();

    const battlefield: Unit[][] = [
      [enemyUnit1, enemyUnit2, dummyUnit],
      [dummyUnit, unit, dummyUnit],
    ];

    const enemyUnits = unit.getEnemyUnits(battlefield);
    const possibleTargets = unit.getPossibleTargets(battlefield, enemyUnits);

    expect(possibleTargets).toContain(enemyUnit1);
    expect(possibleTargets).toContain(enemyUnit2);
  });
});
