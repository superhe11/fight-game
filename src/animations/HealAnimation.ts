import { Animations } from "./Animation";

export class HealAnimation extends Animations {
  constructor() {
    super("heal", {
      iconName: "FaSun",
      color: "green",
      size: 60,
    });
  }
}
