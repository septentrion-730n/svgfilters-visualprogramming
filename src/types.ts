export type Cable = {
  sourceId: string;
  targetId: string;
};
export type CableCoordinates = Cable & {
  sourceCoords: [number, number];
  targetCoords: [number, number];
};

export type Brick = {
  id: string;
  label?: string;
  position: [number, number];
  brickType?: "source" | "feBlend" | "feFlood";
};

export type BrickSource = Brick & {
  brickType: "source";
  type: "text" | "photo" | "illustration";
};

export type BrickFeBlend = Brick & {
  brickType: "feBlend";
  mode: BlendMode;
  x: number;
  y: number;
  width: number;
  height: number;
  in: [string, string];
};

export type BrickFeFlood = Brick & {
  brickType: "feFlood";
  color: string;
  opacity: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type BlendMode =
  | "normal"
  | "multiply"
  | "screen"
  | "overlay"
  | "darken"
  | "lighten"
  | "color-dodge"
  | "color-burn"
  | "hard-light"
  | "soft-light"
  | "difference"
  | "exclusion"
  | "hue"
  | "saturation"
  | "color"
  | "luminosity";
