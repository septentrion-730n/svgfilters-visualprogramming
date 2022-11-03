export type Cable = {
  sourceId: string;
  targetId: string;
};
export type CableCoordinates = Cable & {
  sourceCoords: [number, number];
  targetCoords: [number, number];
};
