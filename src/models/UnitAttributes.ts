export interface Position {
  x: number;
  y: number;
}

export interface UnitAttributes {
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
}
