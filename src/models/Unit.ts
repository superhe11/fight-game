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
    battlefield: Unit[][],
    enemyUnits: Unit[],
  ): Unit[];

  abstract initActions(): void;

  getEnemyUnits(battlefield: Unit[][]): Unit[] {
    const enemyUnits: Unit[] = [];
    battlefield.forEach((row) => {
      row.forEach((cell) => {
        const isEnemyTeam = cell.attributes.team !== this.attributes.team;
        const hasHp = cell.attributes.hp > 0;
        if (isEnemyTeam && hasHp) {
          enemyUnits.push(cell);
        }
      });
    });
    return enemyUnits;
  }

  getAllyUnits(battlefield: Unit[][]): Unit[] {
    const allyUnits: Unit[] = [];
    battlefield.forEach((row) => {
      row.forEach((cell) => {
        const isAllyUnit = cell.attributes.team === this.attributes.team;
        const hasHp = cell.attributes.hp > 0;
        if (isAllyUnit && hasHp) {
          allyUnits.push(cell);
        }
      });
    });
    return allyUnits;
  }
}
