import { motion } from "framer-motion";
import { FaBolt, FaSun } from "react-icons/fa";
import { GiCrossedSwords } from "react-icons/gi";
import { ActionAnimation } from "../../animations/ActionAnimation";

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "GiCrossedSwords":
      return GiCrossedSwords;
    case "FaSun":
      return FaSun;
    case "FaBolt":
      return FaBolt;
    default:
      return null;
  }
};

interface UnitAnimationIconProps {
  animation: ActionAnimation;
}

export const UnitAnimationIcon: React.FC<UnitAnimationIconProps> = ({ animation }) => {
  const IconComponent = getIconComponent(animation.iconData.iconName);

  return (
    <motion.div
      initial={{ opacity: 1, scale: 0 }}
      animate={{ opacity: 0, scale: 2 }}
      transition={{ duration: 0.6 }}
      style={{
        position: "absolute",
        top: "35%",
        left: "35%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {IconComponent && (
        <IconComponent
          color={animation.iconData.color}
          size={animation.iconData.size}
        />
      )}
    </motion.div>
  );
};