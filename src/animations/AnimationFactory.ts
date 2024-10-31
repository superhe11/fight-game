import { Animations } from "./Animation";
import { AttackAnimation } from "./AttackAnimation";
import { HealAnimation } from "./HealAnimation";
import { StunAnimation } from "./StunAnimation";

export class AnimationsFactory {
  static createStrategy(actionType: string): Animations {
    switch (actionType) {
      case "attack":
      case "aoeAttack":
        return new AttackAnimation();
      case "heal":
      case "aoeHeal":
        return new HealAnimation();
      case "paralyze":
        return new StunAnimation();
      default:
        throw new Error(`Неизвестный тип действия: ${actionType}`);
    }
  }
}
