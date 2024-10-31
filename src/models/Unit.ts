import { UnitAttributes } from "./UnitAttributes";
import { Action } from "../actions/Action";

export abstract class Unit {
  attributes: UnitAttributes;
  actions: Action[] = [];

  constructor(attributes: UnitAttributes) {
    this.attributes = attributes;
    this.initActions();
  }

  abstract getPossibleTargets(
    battlefield: (Unit | null)[][],
    enemyUnits: Unit[],
  ): Unit[];

  abstract initActions(): void;

  getEnemyUnits(battlefield: (Unit | null)[][]): Unit[] {
    const enemyUnits: Unit[] = [];
    battlefield.forEach((row) => {
      row.forEach((cell) => {
        if (
          cell &&
          cell.attributes.team !== this.attributes.team &&
          cell.attributes.hp > 0
        ) {
          enemyUnits.push(cell);
        }
      });
    });
    return enemyUnits;
  }

  getAllyUnits(battlefield: (Unit | null)[][]): Unit[] {
    const allyUnits: Unit[] = [];
    battlefield.forEach((row) => {
      row.forEach((cell) => {
        if (
          cell &&
          cell.attributes.team === this.attributes.team &&
          cell.attributes.hp > 0
        ) {
          allyUnits.push(cell);
        }
      });
    });
    return allyUnits;
  }
}
