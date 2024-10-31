import { RangeUnit } from "../UnitTypes/RangeUnit";
import { UnitAttributes } from "../UnitAttributes";
import elfArcherImage from "../../img/ElfArcher.png";
import elfArcherVideo from "../../mp4/ElfArcher.mp4";

export class ElfArcher extends RangeUnit {
  constructor() {
    const attributes: UnitAttributes = {
      name: "Elf Archer",
      hp: 90,
      maxHp: 90,
      damage: 45,
      initiative: 60,
      image: elfArcherImage,
      video: elfArcherVideo,
    };
    super(attributes);
  }
}
