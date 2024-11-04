import { Position } from "../models/UnitAttributes";

describe("Position", () => {
  it("должен корректно создавать объект с заданными координатами", () => {
    const position = new Position(5, 10);
    expect(position.x).toBe(5);
    expect(position.y).toBe(10);
  });
});
