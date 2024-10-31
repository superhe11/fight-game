import { SingleTargetHealer } from "../UnitTypes/SingleTargetHealer";
import { UnitAttributes } from "../UnitAttributes";
import monkImage from "../../img/Monk.png";
import monkVideo from "../../mp4/Monk.mp4";

export class Monk extends SingleTargetHealer {
  constructor() {
    const attributes: UnitAttributes = {
      name: "Monk",
      hp: 90,
      maxHp: 90,
      damage: 40,
      initiative: 20,
      image: monkImage,
      video: monkVideo,
    };
    super(attributes);
  }
}
