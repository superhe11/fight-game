import { MeleeUnit } from "../UnitTypes/MeleeUnit";
import { UnitAttributes } from "../UnitAttributes";
import centaurImage from "../../img/Centaur.png";
import centaurVideo from "../../mp4/Centaur.mp4";

export class Centaur extends MeleeUnit {
  constructor() {
    const attributes: UnitAttributes = {
      name: "Centaur",
      hp: 150,
      maxHp: 150,
      damage: 50,
      initiative: 50,
      image: centaurImage,
      video: centaurVideo,
    };
    super(attributes);
  }
}
