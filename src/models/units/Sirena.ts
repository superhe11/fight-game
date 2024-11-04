import { ParalyzerUnit } from "../UnitTypes/ParalyzerUnit";
import { UnitAttributes } from "../UnitAttributes";
import sirenaImage from "../../img/Sirena.png";
import sirenaVideo from "../../mp4/Sirena.mp4";

export class Sirena extends ParalyzerUnit {
  constructor() {
    const attributes: UnitAttributes = {
      name: "Sirena",
      hp: 80,
      maxHp: 80,
      damage: 0,
      initiative: 20,
      image: sirenaImage,
      video: sirenaVideo,
    };
    super(attributes);
  }
}
