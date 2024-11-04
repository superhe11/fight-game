import { Animations } from "./Animation";

export class StunAnimation extends Animations {
  constructor() {
    super("paralyze", {
      iconName: "FaBolt",
      color: "blue",
      size: 60,
    });
  }
}
