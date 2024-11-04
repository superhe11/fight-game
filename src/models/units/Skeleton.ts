import { MeleeUnit } from "../UnitTypes/MeleeUnit";
import { UnitAttributes } from "../UnitAttributes";
import skeletonImage from "../../img/Skeleton.png";
import skeletonVideo from "../../mp4/Skeleton.mp4";

export class Skeleton extends MeleeUnit {
  constructor() {
    const attributes: UnitAttributes = {
      name: "Skeleton",
      hp: 100,
      maxHp: 100,
      damage: 25,
      initiative: 50,
      image: skeletonImage,
      video: skeletonVideo,
    };
    super(attributes);
  }
}
