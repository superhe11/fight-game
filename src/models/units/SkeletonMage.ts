import { MageUnit } from "../UnitTypes/MageUnit";
import { UnitAttributes } from "../UnitAttributes";
import skeletonMageImage from "../../img/SkeletonMage.png";
import skeletonMageVideo from "../../mp4/SkeletonMage.mp4";

export class SkeletonMage extends MageUnit {
  constructor() {
    const attributes: UnitAttributes = {
      name: "Skeleton Mage",
      hp: 50,
      maxHp: 50,
      damage: 20,
      initiative: 40,
      image: skeletonMageImage,
      video: skeletonMageVideo,
    };
    super(attributes);
  }
}
