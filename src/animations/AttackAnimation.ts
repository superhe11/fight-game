import { Animations } from "./Animation";

export class AttackAnimation extends Animations {
  constructor() {
    super("attack", {
      iconName: "GiCrossedSwords",
      color: "red",
      size: 60,
    });
  }
}
