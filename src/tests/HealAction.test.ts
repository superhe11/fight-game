import { HealAction } from "../actions/HealAction";
import { SingleTargetHealer } from "../models/UnitTypes/SingleTargetHealer";
import { MeleeUnit } from "../models/UnitTypes/MeleeUnit";
import { UnitAttributes } from "../models/UnitAttributes";
import { Position } from "../models/UnitAttributes";
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
      "red",
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

describe("HealAction", () => {
  let action: HealAction;
  let healer: SingleTargetHealer;
  let ally: Unit;
  let battlefield: Unit[][];

  beforeEach(() => {
    action = new HealAction();

    const healerAttributes = new UnitAttributes(
      "TestHealerUnit",
      80,
      80,
      30,
      20,
      "TestHealerUnit.png",
      "TestHealerUnit.mp4",
      "red",
      new Position(1, 1),
    );
    healer = new SingleTargetHealer(healerAttributes);

    const allyAttributes = new UnitAttributes(
      "TestAllyUnit",
      50,
      100,
      40,
      15,
      "TestAllyUnit.png",
      "TestAllyUnit.mp4",
      "red",
      new Position(1, 0),
    );
    ally = new MeleeUnit(allyAttributes);

    const dummyUnit = new DummyUnit();

    battlefield = [
      [ally, dummyUnit, dummyUnit],
      [dummyUnit, healer, dummyUnit],
    ];
  });

  it("должен корректно исцелять союзника", (done) => {
    const setAnimations = jest.fn();
    action.perform(healer, [ally], battlefield, setAnimations);

    setTimeout(() => {
      expect(ally.attributes.hp).toBe(70);
      done();
    }, 600);
  });

  it("должен не превышать максимальное здоровье при исцелении", (done) => {
    ally.attributes.hp = 90;
    const setAnimations = jest.fn();
    action.perform(healer, [ally], battlefield, setAnimations);

    setTimeout(() => {
      expect(ally.attributes.hp).toBe(100);
      done();
    }, 600);
  });

  it("должен возвращать корректные возможные цели для исцеления", () => {
    const possibleTargets = action.getPossibleTargets(healer, battlefield);
    expect(possibleTargets).toContain(ally);
  });
});
