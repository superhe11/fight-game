import { Unit } from "../../models/Unit";

interface TurnOrderItemProps {
  unit: Unit;
  isCurrent: boolean;
  onHoverUnit: (unit: Unit | null) => void;
}

export const TurnOrderItem: React.FC<TurnOrderItemProps> = ({
  unit,
  isCurrent,
  onHoverUnit,
}) => {
  return (
    <li
      onMouseEnter={() => onHoverUnit(unit)}
      onMouseLeave={() => onHoverUnit(null)}
      className={isCurrent ? "current" : ""}
    >
      {unit.attributes.name} ({unit.attributes.team}) - HP: {unit.attributes.hp}
      /{unit.attributes.maxHp}
    </li>
  );
};
