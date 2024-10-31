import { useState, useEffect } from "react";
import { ActionAnimation } from "../animations/ActionAnimation";
import { Unit } from "../models/Unit";
import { UnitFactory } from "../factories/UnitFactory";
import { Action } from "../actions/Action";

export const GameLogic = () => {
  const [battlefield, setBattlefield] = useState<(Unit | null)[][]>([]);
  const [turnOrder, setTurnOrder] = useState<Unit[]>([]);
  const [currentUnitIndex, setCurrentUnitIndex] = useState(0);
  const [highlightedUnits, setHighlightedUnits] = useState<Unit[]>([]);
  const [hoveredUnit, setHoveredUnit] = useState<Unit | null>(null);
  const [currentAction, setCurrentAction] = useState<Action | null>(null);
  const [animations, setAnimations] = useState<ActionAnimation[]>([]);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const numRows = 4;
    const battlefieldGrid: (Unit | null)[][] = Array.from(
      { length: numRows },
      () => Array.from({ length: 3 }, () => null),
    );

    const teams: Array<"red" | "orange"> = ["red", "orange"];
    const allUnits: Unit[] = [];

    const unitNames = UnitFactory.getUnitNames();

    teams.forEach((team) => {
      for (let y = 0; y < 2; y++) {
        for (let x = 0; x < 3; x++) {
          const randomUnitName =
            unitNames[Math.floor(Math.random() * unitNames.length)];

          const position = {
            x,
            y: team === "red" ? numRows - 1 - y : y,
          };

          const unit = UnitFactory.createUnit(randomUnitName);
          unit.attributes.team = team;
          unit.attributes.position = position;
          unit.attributes.isDefending = false;
          unit.attributes.isParalyzed = false;

          battlefieldGrid[position.y][position.x] = unit;
          allUnits.push(unit);
        }
      }
    });

    const sortedUnits = allUnits.sort((a, b) => {
      if (a.attributes.initiative === b.attributes.initiative) {
        return Math.random() - 0.5;
      }
      return b.attributes.initiative - a.attributes.initiative;
    });

    setBattlefield(battlefieldGrid);
    setTurnOrder(sortedUnits);
    setCurrentUnitIndex(0);
  };

  const handleUnitClick = (unit: Unit) => {
    if (highlightedUnits.includes(unit)) {
      setHighlightedUnits([unit]);
    }
  };

  const handleAction = (action: Action) => {
    const currentUnit = turnOrder[currentUnitIndex];
    const possibleTargets = action.getPossibleTargets(currentUnit, battlefield);
    setCurrentAction(action);
    setHighlightedUnits(possibleTargets);
  };

  const confirmAction = () => {
    const currentUnit = turnOrder[currentUnitIndex];

    if (!currentAction) {
      alert("Выберите действие.");
      return;
    }

    if (currentAction.type !== "defend" && highlightedUnits.length === 0) {
      alert("Выберите цель для действия.");
      return;
    }

    const targets = currentAction.type === "defend" ? [] : highlightedUnits;

    currentAction.perform(currentUnit, targets, battlefield, setAnimations);

    setTimeout(() => {
      setHighlightedUnits([]);
      setCurrentAction(null);
      setAnimations([]);
      endTurn();
    }, 600);
  };

  const endTurn = () => {
    let nextIndex = currentUnitIndex;

    do {
      nextIndex = (nextIndex + 1) % turnOrder.length;
      const nextUnit = turnOrder[nextIndex];

      if (nextUnit.attributes.hp === 0) continue;

      if (nextUnit.attributes.isParalyzed) {
        nextUnit.attributes.isParalyzed = false;
        continue;
      }

      setCurrentUnitIndex(nextIndex);
      break;
    } while (nextIndex !== currentUnitIndex);

    const teamsAlive = new Set<"red" | "orange">(
      turnOrder
        .filter((unit) => unit.attributes.hp > 0 && unit.attributes.team)
        .map((unit) => unit.attributes.team as "red" | "orange"),
    );
    if (teamsAlive.size <= 1) {
      const winningTeam = teamsAlive.values().next().value;
      alert(`Игра окончена! Победила команда ${winningTeam}`);
    }
  };

  const handleHoverUnit = (unit: Unit | null) => {
    setHoveredUnit(unit);
  };

  const currentUnit = turnOrder.length > 0 ? turnOrder[currentUnitIndex] : null;

  return {
    battlefield,
    turnOrder,
    currentUnitIndex,
    currentUnit,
    highlightedUnits,
    hoveredUnit,
    currentAction,
    animations,
    handleUnitClick,
    handleAction,
    confirmAction,
    handleHoverUnit,
  };
};
