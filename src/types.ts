import { IconType } from "react-icons";
import { BsPalette, BsPinMapFill, BsOctagonHalf } from "react-icons/bs";

export type ConnectorData = {
  brickId: string;
  connectorId: string;
};

export type ConnectionData = {
  in: ConnectorData;
  out: ConnectorData;
};

export type ConnectionSelectionData = {
  in: ConnectorData | null;
  out: ConnectorData | null;
};
export type BrickType = "source" | "feBlend" | "feFlood";

export type BrickTypeConfig = {
  in: string[];
  icon: IconType;
};

// https://react-icons.github.io/react-icons/icons?name=bs
export const BricksTypesConfig: Record<BrickType, BrickTypeConfig> = {
  source: {
    in: [],
    icon: BsPinMapFill,
  },
  feBlend: {
    in: ["in1", "in2"],
    icon: BsOctagonHalf,
  },
  feFlood: {
    in: [],
    icon: BsPalette,
  },
};
export type BrickData = {
  id: string;
  label?: string;
  position: [number, number];
  brickType: BrickType;
};

export type BrickSourceData = BrickData & {
  brickType: "source";
  type: "text" | "photo" | "illustration" | "mixed" | "video";
};

export type BrickFeBlendData = BrickData & {
  brickType: "feBlend";
  mode: BlendMode;
  x: number;
  y: number;
  width: number;
  height: number;
  in: [string, string];
};

export type BrickFeFloodData = BrickData & {
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

export const connectorDataGetId = (connectorData: ConnectorData) => {
  return `${connectorData.brickId}_${connectorData.connectorId}`;
};
