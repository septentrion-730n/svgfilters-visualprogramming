import { useState } from "react";

import { ConnectionData, connectorDataGetId } from "../types";
import useRequestAnimationFrame from "../utils/useRequestAnimationFrame";
import { useEditorContext } from "./EditorContextProvider";

import "./ConnectionsDrawer.scss";

export const ConnectionsDrawer = () => {
  const { connections } = useEditorContext();
  const [renderings, setRenderings] = useState<number>(0);

  useRequestAnimationFrame(() => {
    setRenderings((renderings) => renderings + 1);
  });

  const connectionsCordinates = connections.map(
    (connection: ConnectionData) => {
      const containerEl = document.getElementById("connections-drawer__paper");
      const inEl = document.getElementById(connectorDataGetId(connection.in));
      const outEl = document.getElementById(connectorDataGetId(connection.out));
      if (!containerEl || !inEl || !outEl) return null;

      const containerRect = containerEl.getBoundingClientRect();
      const {
        x: inX,
        y: inY,
        width: inWidth,
        height: inHeight,
      } = inEl.getBoundingClientRect();
      const {
        x: outX,
        y: outY,
        width: outWidth,
        height: outHeight,
      } = outEl.getBoundingClientRect();

      const inCoords = [
        inX - containerRect.left + 0.5 * inWidth,
        inY - containerRect.top + 0.5 * inHeight,
      ];
      const outCoords = [
        outX - containerRect.left + 0.5 * outWidth,
        outY - containerRect.top + 0.5 * outHeight,
      ];
      const connectionDelta = [
        Math.abs(inCoords[0] - outCoords[0]),
        Math.abs(inCoords[1] - outCoords[1]),
      ];
      const elasticity = 40;
      const elasticBaseLength = 250;
      const connectionLength = Math.sqrt(
        Math.pow(connectionDelta[0], 2) + Math.pow(connectionDelta[1], 2)
      );
      const minCoords = [
        Math.min(inCoords[0], outCoords[0]),
        Math.max(inCoords[1], outCoords[1]),
      ];

      const anchorCoords = [
        minCoords[0] + 0.5 * connectionDelta[0],
        Math.max(inCoords[1], outCoords[1]) +
          elasticity * Math.min(1, elasticBaseLength / connectionLength),
      ];
      return {
        anchorCoords,
        inCoords,
        outCoords,
      } as ConnectionCordinates;
    }
  );

  return (
    <div className="connections-drawer">
      <div className="connections-drawer__debug">{renderings}</div>
      <svg id="connections-drawer__paper" className="connections-drawer__paper">
        {connectionsCordinates.map((connectionCordinates, index) => {
          if (!connectionCordinates) return null;
          const { anchorCoords, inCoords, outCoords } = connectionCordinates;
          return (
            <>
              <path
                key={`connection_${index}`}
                className="__connection"
                d={`M ${inCoords[0]} ${inCoords[1]} C ${inCoords[0]} ${inCoords[1]} ${anchorCoords[0]} ${anchorCoords[1]} ${outCoords[0]} ${outCoords[1]}`}
              />
              <circle
                key={`anchor_${index}`}
                className="__anchor"
                cx={anchorCoords[0]}
                cy={anchorCoords[1]}
                r={4}
              />
            </>
          );
        })}
      </svg>
    </div>
  );
};

type ConnectionCordinates = {
  anchorCoords: [number, number];
  inCoords: [number, number];
  outCoords: [number, number];
};
