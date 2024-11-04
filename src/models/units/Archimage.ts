import { MageUnit } from "../UnitTypes/MageUnit";
import { UnitAttributes } from "../UnitAttributes";
import archimageImage from "../../img/Archimage.png";
import archimageVideo from "../../mp4/Archimage.mp4";

export class Archimage extends MageUnit {
  constructor() {
    const attributes: UnitAttributes = {
      name: "Archimage",
      hp: 90,
      maxHp: 90,
      damage: 30,
      initiative: 40,
      image: archimageImage,
      video: archimageVideo,
    };
    super(attributes);
  }
}
