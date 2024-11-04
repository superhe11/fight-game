import { useState, useEffect } from "react";
import { ActionAnimation } from "../animations/ActionAnimation";
import { Unit } from "../models/Unit";
import { UnitFactory } from "../factories/UnitFactory";
import { Action } from "../actions/Action";

enum Team {
  Red = "red",
  Orange = "orange",
}

const TIMEOUT_VALUE = 600;

function useInitializeGame() {
  const [battlefield, setBattlefield] = useState<Unit[][]>([]);
  const [turnOrder, setTurnOrder] = useState<Unit[]>([]);

  const initializeGame = () => {
    const unitNames = UnitFactory.getUnitNames();
    const numRows = 4;
    const battlefieldGrid: Unit[][] = Array.from({ length: numRows }, () =>
      Array.from({ length: 3 }, () => {
        const randomUnitName =
          unitNames[Math.floor(Math.random() * unitNames.length)];
        const unit = UnitFactory.createUnit(randomUnitName);
        unit.attributes.isDefending = false;
        unit.attributes.isParalyzed = false;
        return unit;
      }),
    );

    const teams: Team[] = [Team.Red, Team.Orange];
    const allUnits: Unit[] = [];

    teams.forEach((team) => {
      for (let y = 0; y < 2; y++) {
        for (let x = 0; x < 3; x++) {
          const position = {
            x,
            y: team === Team.Red ? numRows - 1 - y : y,
          };

          battlefieldGrid[position.y][position.x].attributes.team = team;
          battlefieldGrid[position.y][position.x].attributes.position =
            position;

          allUnits.push(battlefieldGrid[position.y][position.x]);
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
  };

  useEffect(() => {
    initializeGame();
  }, []);

  return { battlefield, turnOrder };
}

function useTurnManagement(
  turnOrder: Unit[],
  battlefield: Unit[][],
  TIMEOUT_VALUE: number,
) {
  const [currentUnitIndex, setCurrentUnitIndex] = useState(0);
  const [highlightedUnits, setHighlightedUnits] = useState<Unit[]>([]);
  const [selectedUnits, setSelectedUnits] = useState<Unit[]>([]);
  const [currentAction, setCurrentAction] = useState<Action | null>(null);
  const [animations, setAnimations] = useState<ActionAnimation[]>([]);
  const [hoveredUnit, setHoveredUnit] = useState<Unit | null>(null);

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

    const teamsAlive = new Set<Team>(
      turnOrder
        .filter((unit) => unit.attributes.hp > 0 && unit.attributes.team)
        .map((unit) => unit.attributes.team as Team),
    );
    if (teamsAlive.size <= 1) {
      const winningTeam = teamsAlive.values().next().value;
      alert(`Игра окончена! Победила команда ${winningTeam}`);
    }
  };

  const confirmAction = () => {
    const currentUnit = turnOrder[currentUnitIndex];

    if (!currentAction) {
      alert("Выберите действие.");
      return;
    }

    if (currentAction.requiresTargetSelection && selectedUnits.length === 0) {
      alert("Выберите цель для действия.");
      return;
    }

    const targets = currentAction.requiresTargetSelection
      ? selectedUnits
      : currentAction.getPossibleTargets(currentUnit, battlefield);

    currentAction.perform(currentUnit, targets, battlefield, setAnimations);

    setTimeout(() => {
      setHighlightedUnits([]);
      setSelectedUnits([]);
      setCurrentAction(null);
      setAnimations([]);
      endTurn();
    }, TIMEOUT_VALUE);
  };

  const handleAction = (action: Action) => {
    const currentUnit = turnOrder[currentUnitIndex];
    const possibleTargets = action.getPossibleTargets(currentUnit, battlefield);

    setCurrentAction(action);

    if (action.requiresTargetSelection) {
      setHighlightedUnits(possibleTargets);
      setSelectedUnits([]);
    } else {
      setHighlightedUnits([]);
      setSelectedUnits([]);
    }
  };

  const handleUnitClick = (unit: Unit) => {
    if (currentAction && currentAction.requiresTargetSelection) {
      if (highlightedUnits.includes(unit)) {
        setSelectedUnits([unit]);
      }
    }
  };

  const handleHoverUnit = (unit: Unit | null) => {
    setHoveredUnit(unit);
  };

  return {
    currentUnitIndex,
    highlightedUnits,
    selectedUnits,
    currentAction,
    animations,
    hoveredUnit,
    setHighlightedUnits,
    setSelectedUnits,
    setCurrentAction,
    confirmAction,
    handleAction,
    handleUnitClick,
    handleHoverUnit,
  };
}

export function useGameLogic() {
  const { battlefield, turnOrder } = useInitializeGame();
  const {
    currentUnitIndex,
    highlightedUnits,
    selectedUnits,
    currentAction,
    animations,
    handleUnitClick,
    handleAction,
    confirmAction,
    hoveredUnit,
    handleHoverUnit,
  } = useTurnManagement(turnOrder, battlefield, TIMEOUT_VALUE);

  const currentUnit = turnOrder.length > 0 ? turnOrder[currentUnitIndex] : null;

  return {
    battlefield,
    turnOrder,
    currentUnitIndex,
    currentUnit,
    highlightedUnits,
    selectedUnits,
    currentAction,
    animations,
    handleUnitClick,
    handleAction,
    confirmAction,
    hoveredUnit,
    handleHoverUnit,
  };
}
