import { useEffect, useState } from "react";
import { CableCoordinates } from "../types";
import useRequestAnimationFrame from "../utils/useAnimationFrame";
import { useCablesUIContext } from "./CablesUIProvider";

export const CablesUI = () => {
  const {
    cables,
    shouldAnimate,
    startAnimation,
    stopAnimation,
  } = useCablesUIContext();

  const [renders, setRenders] = useState<number>(0);
  const [cablesCoordinates, setCablesCoordinates] = useState<
    CableCoordinates[]
  >([]);

  const nextAnimationFrameHandler = () => {
    const cablesuiEl = document.getElementById("cables-ui");
    if (!cablesuiEl) return;
    const cablesuiRect = cablesuiEl?.getBoundingClientRect();

    const cablesCoordinates = cables
      .map((cable) => {
        const el1 = document.getElementById(cable.sourceId);
        const el2 = document.getElementById(cable.targetId);
        if (!el1 || !el2) return null;
        const r1 = el1.getBoundingClientRect();
        const r2 = el2.getBoundingClientRect();
        return {
          sourceId: cable.sourceId,
          targetId: cable.targetId,
          sourceCoords: [
            r1.left + 0.5 * r1.width - cablesuiRect.left,
            r1.top + 0.5 * r1.height - cablesuiRect.top,
          ],
          targetCoords: [
            r2.left + 0.5 * r2.width - cablesuiRect.left,
            r2.top + 0.5 * r2.height - cablesuiRect.top,
          ],
        };
      })
      .filter((coordinates) => coordinates !== null) as CableCoordinates[];
    setCablesCoordinates(cablesCoordinates);
    setRenders((renders) => renders + 1);
  };

  useEffect(() => {
    startAnimation();
    setTimeout(() => stopAnimation(), 50);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cables]);

  useRequestAnimationFrame(nextAnimationFrameHandler, { shouldAnimate });

  return (
    <svg id="cables-ui" className="svgfilters-editor__cables-sui">
      <text x={20} y={20}>
        {renders}
      </text>
      {cablesCoordinates.map((cablesCoordinate, index) => {
        const { sourceCoords: source, targetCoords: target } = cablesCoordinate;
        const startPosition = `M ${source[0]} ${source[1]} `;
        const firstControlPoint = `C ${source[0]} ${source[1]} `;
        const secondControlPoint = `${source[0] +
          0.5 * (target[0] - source[0])} ${elasticity *
          Math.max(source[1], target[1])} `;
        const endPosition = ` ${target[0]} ${target[1]} `;

        return (
          <path
            key={index}
            d={`${startPosition} ${firstControlPoint} ${secondControlPoint} ${endPosition}`}
            stroke="black"
            fill="none"
          />
        );
      })}
    </svg>
  );
};

const elasticity = 1.2;
