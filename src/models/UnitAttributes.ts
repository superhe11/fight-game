export class Position {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class UnitAttributes {
  name: string;
  hp: number;
  maxHp: number;
  damage?: number;
  initiative: number;
  image?: string;
  video?: string;
  team?: "red" | "orange";
  position?: Position;
  isDefending?: boolean;
  isParalyzed?: boolean;

  constructor(
    name: string,
    hp: number,
    maxHp: number,
    initiative: number,
    damage?: number,
    image?: string,
    video?: string,
    team?: "red" | "orange",
    position?: Position,
    isDefending?: boolean,
    isParalyzed?: boolean,
  ) {
    this.name = name;
    this.hp = hp;
    this.maxHp = maxHp;
    this.initiative = initiative;
    this.damage = damage;
    this.image = image;
    this.video = video;
    this.team = team;
    this.position = position;
    this.isDefending = isDefending;
    this.isParalyzed = isParalyzed;
  }
}
