import { AttackAction } from "../actions/AttackAction";
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

describe("AttackAction", () => {
  let action: AttackAction;
  let attacker: MeleeUnit;
  let defender: MeleeUnit;
  let battlefield: Unit[][];

  beforeEach(() => {
    action = new AttackAction();

    const attackerAttributes = new UnitAttributes(
      "TestAttackUnit",
      100,
      100,
      50,
      25,
      "TestAttackUnit.png",
      "TestAttackUnit.mp4",
      "red",
      new Position(1, 1),
    );
    attacker = new MeleeUnit(attackerAttributes);

    const defenderAttributes = new UnitAttributes(
      "TestDefendUnit",
      100,
      100,
      40,
      15,
      "TestDefendUnit.png",
      "TestDefendUnit.mp4",
      "orange",
      new Position(1, 0),
    );
    defender = new MeleeUnit(defenderAttributes);

    const dummyUnit = new DummyUnit();

    battlefield = [
      [defender, dummyUnit, dummyUnit],
      [dummyUnit, attacker, dummyUnit],
    ];
  });

  it("должен корректно выполнять атаку по цели", (done) => {
    const setAnimations = jest.fn();
    action.perform(attacker, [defender], battlefield, setAnimations);

    setTimeout(() => {
      expect(defender.attributes.hp).toBe(75);
      done();
    }, 600);
  });

  it("должен уменьшать урон наполовину, если цель защищается", (done) => {
    defender.attributes.isDefending = true;
    const setAnimations = jest.fn();
    action.perform(attacker, [defender], battlefield, setAnimations);

    setTimeout(() => {
      expect(defender.attributes.hp).toBe(87.5);
      expect(defender.attributes.isDefending).toBe(false);
      done();
    }, 600);
  });

  it("должен возвращать корректные возможные цели", () => {
    const possibleTargets = action.getPossibleTargets(attacker, battlefield);
    expect(possibleTargets).toContain(defender);
  });
});
