// https://react-icons.github.io/react-icons/icons?name=bs
import { IconType } from "react-icons";
import { BsPalette, BsPinMapFill, BsOctagonHalf } from "react-icons/bs";
import { ConnectorData } from ".";

export type BrickTypes = "source" | "feBlend" | "feFlood";

export interface BrickTypeDescription {
  inputs: string[];
  icon: IconType;
}

export const brickTypesDescriptions: Record<BrickTypes, BrickTypeDescription> =
  {
    source: {
      inputs: [],
      icon: BsPinMapFill,
    },
    feBlend: {
      inputs: ["in1", "in2"],
      icon: BsOctagonHalf,
    },
    feFlood: {
      inputs: [],
      icon: BsPalette,
    },
  };

export type BrickData<Implementation extends BrickTypes> = {
  type: Implementation;
  id: string;
  label?: string;
  position: [number, number];
  outputsTo: ConnectorData[];
  config: BrickConfigurations[Implementation];
};

export type BrickConfigurations = {
  source: SourceBrickConfiguration;
  feFlood: FeFloodBrickConfiguration;
  feBlend: FeBlendBrickConfiguration;
};

export type SourceBrickConfiguration = {
  type: "text" | "photo" | "illustration" | "mixed" | "video";
};

export type FeFloodBrickConfiguration = {
  color: string;
  opacity: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type FeBlendBrickConfiguration = {
  mode: string;
  x: number;
  y: number;
  width: number;
  height: number;
};
