import React from "react";
import { Unit } from "../../models/Unit";
import { Action } from "../../actions/Action";
import styles from "../../styles/ActionButtons.module.css";

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
    <div className={styles.actions}>
      {currentUnit.actions.map((action) => (
        <button
          key={action.type}
          onClick={() => handleAction(action)}
          className={styles.button}
        >
          {action.label}
        </button>
      ))}
      {currentAction && (
        <button onClick={confirmAction} className={styles.button}>
          Подтвердить действие
        </button>
      )}
    </div>
  );
};
