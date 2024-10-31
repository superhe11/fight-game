import React from "react";
import { Unit } from "../../models/Unit";
import { Action } from "../../actions/Action";

interface ActionButtonsProps {
  currentUnit: Unit | null;
  handleAction: (action: Action) => void;
  highlightedUnitsLength: number;
  currentAction: Action | null;
  confirmAction: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  currentUnit,
  handleAction,
  currentAction,
  confirmAction,
}) => {
  if (!currentUnit) {
    return null;
  }

  return (
    <div className="actions">
      {currentUnit.actions.map((action) => (
        <button key={action.type} onClick={() => handleAction(action)}>
          {action.label}
        </button>
      ))}
      {currentAction && (
        <button onClick={confirmAction}>Подтвердить действие</button>
      )}
    </div>
  );
};
