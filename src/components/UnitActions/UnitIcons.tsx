import { Unit } from "../../models/Unit";
import {
  FaShieldAlt,
  FaCrosshairs,
  FaHandHoldingMedical,
} from "react-icons/fa";

interface UnitIconsProps {
  unit: Unit;
  isHighlighted: boolean;
  actionType: string;
}

export const UnitIcons: React.FC<UnitIconsProps> = ({
  unit,
  isHighlighted,
  actionType,
}) => {
  const icons = [];

  if (unit.attributes.isDefending) {
    icons.push(
      <FaShieldAlt key="defend" color="darkgray" size={20} title="Защита" />,
    );
  }
  if (isHighlighted && (actionType === "attack" || actionType === "paralyze")) {
    icons.push(
      <FaCrosshairs key="attack" color="red" size={20} title="Цель атаки" />,
    );
  }
  
  if (isHighlighted && actionType === "heal") {
    icons.push(
      <FaHandHoldingMedical
        key="heal"
        color="green"
        size={20}
        title="Цель лечения"
      />,
    );
  }

  return <>{icons}</>;
};
