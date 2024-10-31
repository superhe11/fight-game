import { Unit } from "../../models/Unit";
import { ActionAnimation } from "../../animations/ActionAnimation";
import { BattlefieldCellWrapper } from "./BattlefieldCellWrapper";

interface BattlefieldProps {
  battlefield: (Unit | null)[][];
  onUnitClick: (unit: Unit) => void;
  highlightedUnits: Unit[];
  currentUnit: Unit | null;
  hoveredUnit: Unit | null;
  actionType: string;
  animations: ActionAnimation[];
}

export const Battlefield: React.FC<BattlefieldProps> = ({
  battlefield,
  onUnitClick,
  highlightedUnits,
  currentUnit,
  hoveredUnit,
  actionType,
  animations,
}) => {
  return (
    <div className="battlefield">
      {battlefield.map((row, y) => (
        <div key={y} className="row">
          {row.map((unit, x) => (
            <BattlefieldCellWrapper
              key={x}
              unit={unit}
              x={x}
              y={y}
              onUnitClick={onUnitClick}
              highlightedUnits={highlightedUnits}
              currentUnit={currentUnit}
              hoveredUnit={hoveredUnit}
              actionType={actionType}
              animations={animations}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
