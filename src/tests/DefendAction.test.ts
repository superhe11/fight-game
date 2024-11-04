import { DefendAction } from "../actions/DefendAction";
import { MeleeUnit } from "../models/UnitTypes/MeleeUnit";
import { UnitAttributes } from "../models//UnitAttributes";
import { Position } from "../models/UnitAttributes";

describe("DefendAction", () => {
  let action: DefendAction;
  let unit: MeleeUnit;

  beforeEach(() => {
    action = new DefendAction();

    const attributes = new UnitAttributes(
      "TestDefender",
      100,
      100,
      40,
      15,
      "TestDefender.png",
      "TestDefender.mp4",
      "red",
      new Position(1, 1),
    );
    unit = new MeleeUnit(attributes);
  });

  it("должен устанавливать флаг isDefending у юнита", () => {
    action.perform(unit);
    expect(unit.attributes.isDefending).toBe(true);
  });

  it("не должен требовать выбора цели", () => {
    expect(action.requiresTargetSelection).toBe(false);
  });
});
