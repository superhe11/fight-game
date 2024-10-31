import { RangeUnit } from "../UnitTypes/RangeUnit";
import { UnitAttributes } from "../UnitAttributes";
import banditImage from "../../img/Bandit.png";
import banditVideo from "../../mp4/Bandit.mp4";

export class Bandit extends RangeUnit {
  constructor() {
    const attributes: UnitAttributes = {
      name: "Bandit",
      hp: 75,
      maxHp: 75,
      damage: 30,
      initiative: 60,
      image: banditImage,
      video: banditVideo,
    };
    super(attributes);
  }
}
