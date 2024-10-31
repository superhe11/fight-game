import { Unit } from "../../models/Unit";
import { TurnOrderItem } from "./TurnOrderItem";

interface RoundInfoProps {
  turnOrder: Unit[];
  currentUnit: Unit | null;
  onHoverUnit: (unit: Unit | null) => void;
}

export const RoundInfo: React.FC<RoundInfoProps> = ({
  turnOrder,
  currentUnit,
  onHoverUnit,
}) => {
  return (
    <div className="round-info">
      <h2>Порядок ходов</h2>
      <ul>
        {turnOrder.map((unit, index) => (
          <TurnOrderItem
            key={index}
            unit={unit}
            isCurrent={currentUnit === unit}
            onHoverUnit={onHoverUnit}
          />
        ))}
      </ul>
    </div>
  );
};
