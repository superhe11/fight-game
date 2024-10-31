import { Unit } from "../Unit";
import { AttackAction } from "../../actions/AttackAction";
import { DefendAction } from "../../actions/DefendAction";

export class MeleeUnit extends Unit {
  initActions(): void {
    this.actions = [new AttackAction(), new DefendAction()];
  }

  getPossibleTargets(
    battlefield: (Unit | null)[][],
    _enemyUnits: Unit[],
  ): Unit[] {
    const { x, y } = this.attributes.position!;
    const team = this.attributes.team!;
    const battlefieldWidth = battlefield[0].length;
    const battlefieldHeight = battlefield.length;
    const middleRow = Math.floor(battlefieldHeight / 2);

    const isFirstLine =
      (team === "red" && y === middleRow) ||
      (team === "orange" && y === middleRow - 1);

    const isLineAlive = (lineY: number) => {
      return battlefield[lineY].some(
        (unit) =>
          unit && unit.attributes.hp > 0 && unit.attributes.team !== team,
      );
    };

    const getEnemyUnitsInLine = (lineY: number): Unit[] => {
      return battlefield[lineY].filter(
        (unit) =>
          unit && unit.attributes.hp > 0 && unit.attributes.team !== team,
      ) as Unit[];
    };

    const enemyFirstLineY = team === "red" ? middleRow - 1 : middleRow;
    const enemySecondLineY = team === "red" ? middleRow - 2 : middleRow + 1;

    let possibleTargets: Unit[] = [];

    if (isFirstLine) {
      if (isLineAlive(enemyFirstLineY)) {
        possibleTargets = this.getTargetsByFlank(
          getEnemyUnitsInLine(enemyFirstLineY),
          x,
          battlefieldWidth,
        );
      } else if (isLineAlive(enemySecondLineY)) {
        possibleTargets = getEnemyUnitsInLine(enemySecondLineY);
      }
    } else {
      if (!isLineAlive(enemyFirstLineY) && isLineAlive(enemySecondLineY)) {
        possibleTargets = getEnemyUnitsInLine(enemySecondLineY);
      }
    }

    return possibleTargets;
  }
  private getTargetsByFlank(
    enemyLineUnits: Unit[],
    x: number,
    battlefieldWidth: number,
  ): Unit[] {
    if (x === 0) {
      return enemyLineUnits.slice(0, 2);
    } else if (x === battlefieldWidth - 1) {
      return enemyLineUnits.slice(-2);
    } else {
      return enemyLineUnits;
    }
  }
}
