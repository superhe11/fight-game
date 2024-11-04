import { RangeUnit } from "../models/UnitTypes/RangeUnit";
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

describe("RangeUnit", () => {
  let unit: RangeUnit;

  beforeEach(() => {
    const attributes = new UnitAttributes(
      "Archer",
      80,
      80,
      60,
      25,
      "archer.png",
      "archer.mp4",
      "red",
      new Position(2, 1),
    );
    unit = new RangeUnit(attributes);
  });

  it("должен инициализировать действия правильно", () => {
    expect(unit.actions.length).toBe(2);
    expect(unit.actions[0]).toBeInstanceOf(AttackAction);
    expect(unit.actions[1]).toBeInstanceOf(DefendAction);
  });

  it("должен возвращать корректные возможные цели", () => {
    // Создаем врага
    const enemyAttributes = new UnitAttributes(
      "Enemy Archer",
      80,
      80,
      55,
      25,
      "enemy_archer.png",
      "enemy_archer.mp4",
      "orange",
      new Position(2, 0),
    );
    const enemyUnit = new RangeUnit(enemyAttributes);

    // Создаем DummyUnit для пустых ячеек
    const dummyUnit1 = new DummyUnit();
    const dummyUnit2 = new DummyUnit();
    const dummyUnit3 = new DummyUnit();

    // Определяем поле боя как Unit[][]
    const battlefield: Unit[][] = [
      [enemyUnit, dummyUnit1, dummyUnit2],
      [dummyUnit3, unit, dummyUnit1],
    ];

    const enemyUnits = unit.getEnemyUnits(battlefield);
    const possibleTargets = unit.getPossibleTargets(battlefield, enemyUnits);
    expect(possibleTargets).toContain(enemyUnit);
    expect(possibleTargets.length).toBe(1); // Только один живой враг
  });
});
