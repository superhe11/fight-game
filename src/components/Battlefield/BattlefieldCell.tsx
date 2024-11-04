import { Unit } from "../../models/Unit";
import { ActionAnimation } from "../../animations/ActionAnimation";
import { UnitIcons } from "../UnitActions/UnitIcons";
import { UnitAnimationIcon } from "../UnitActions/UnitAnimationIcon";
import styles from "../../styles/BattlefieldCell.module.css";

interface BattlefieldCellProps {
  unit: Unit;
  isHighlighted: boolean;
  isCurrentUnit: boolean;
  isHovered: boolean;
  actionType: string;
  unitAnimations: ActionAnimation[];
  onClick: () => void;
}

export const BattlefieldCell: React.FC<BattlefieldCellProps> = ({
  unit,
  isHighlighted,
  isCurrentUnit,
  isHovered,
  actionType,
  unitAnimations,
  onClick,
}) => {
  const cellClassNames = [
    styles.cell,
    unit && unit.attributes.team ? styles[unit.attributes.team] : "",
    unit && isHighlighted ? styles.highlighted : "",
    unit && isCurrentUnit ? styles.currentUnit : "",
    unit && unit.attributes.isParalyzed ? styles.paralyzed : "",
    unit && unit.attributes.isDefending ? styles.defending : "",
    unit && isHovered ? styles.hovered : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cellClassNames} onClick={onClick}>
      {
        <>
          <div className={styles.unitImageContainer}>
            {isCurrentUnit ? (
              <video
                src={unit.attributes.video}
                autoPlay
                loop
                muted
                style={{
                  filter: unit.attributes.hp <= 0 ? "grayscale(100%)" : "none",
                }}
              />
            ) : (
              <img
                src={unit.attributes.image}
                alt={unit.attributes.name}
                style={{
                  filter: unit.attributes.hp <= 0 ? "grayscale(100%)" : "none",
                }}
              />
            )}
            {unit.attributes.hp > 0 &&
              unit.attributes.hp < unit.attributes.maxHp && (
                <div
                  className={styles.redOverlay}
                  style={{
                    height: `${(1 - unit.attributes.hp / unit.attributes.maxHp) * 100}%`,
                  }}
                />
              )}
            <div className={styles.unitIcons}>
              <UnitIcons
                unit={unit}
                isHighlighted={isHighlighted}
                actionType={actionType}
              />
            </div>
            {unitAnimations.map((animation, index) => (
              <UnitAnimationIcon key={index} animation={animation} />
            ))}
          </div>
          <div className={styles.hpBar}>
            {unit.attributes.hp}/{unit.attributes.maxHp}
          </div>
        </>
      }
    </div>
  );
};
