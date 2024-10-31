import { Unit } from "../../models/Unit";
import { ActionAnimation } from "../../animations/ActionAnimation";
import { BattlefieldCell } from "./BattlefieldCell";

interface BattlefieldCellWrapperProps {
  unit: Unit | null;
  x: number;
  y: number;
  onUnitClick: (unit: Unit) => void;
  highlightedUnits: Unit[];
  currentUnit: Unit | null;
  hoveredUnit: Unit | null;
  actionType: string;
  animations: ActionAnimation[];
}

export const BattlefieldCellWrapper: React.FC<BattlefieldCellWrapperProps> = ({
  unit,
  onUnitClick,
  highlightedUnits,
  currentUnit,
  hoveredUnit,
  actionType,
  animations,
}) => {
  const unitAnimations = animations.filter(
    (animation) => animation.targetUnit === unit,
  );
  const isHighlighted = unit ? highlightedUnits.includes(unit) : false;
  const isCurrentUnit = unit && currentUnit ? unit === currentUnit : false;
  const isHovered = unit && hoveredUnit ? unit === hoveredUnit : false;

  return (
    <BattlefieldCell
      unit={unit}
      isHighlighted={isHighlighted}
      isCurrentUnit={isCurrentUnit}
      isHovered={isHovered}
      actionType={actionType}
      unitAnimations={unitAnimations}
      onClick={() => unit && onUnitClick(unit)}
    />
  );
};
