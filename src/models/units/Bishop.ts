import { UnitAttributes } from "../UnitAttributes";
import bishopImage from "../../img/Bishop.png";
import bishopVideo from "../../mp4/Bishop.mp4";
import { MassHealer } from "../UnitTypes/MassHealer";

export class Bishop extends MassHealer {
  constructor() {
    const attributes: UnitAttributes = {
      name: "Bishop",
      hp: 130,
      maxHp: 130,
      damage: 25,
      initiative: 20,
      image: bishopImage,
      video: bishopVideo,
    };
    super(attributes);
  }
}
