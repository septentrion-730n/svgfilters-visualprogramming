import { useEffect, useState } from "react";
import { CableCoordinates } from "../types";
import useRequestAnimationFrame from "../utils/useAnimationFrame";
import { useEditorContext } from "./EditorContextProvider";

export const CablesUI = () => {
  const {
    cables,
    shouldAnimate,
    startAnimation,
    stopAnimation,
  } = useEditorContext();

  const [renders, setRenders] = useState<number>(0);
  const [cablesCoordinates, setCablesCoordinates] = useState<
    CableCoordinates[]
  >([]);

  const nextAnimationFrameHandler = () => {
    const baseElasticity = 2;
    const baseElasticLength = 120;
    const minElasticity = 1.2;
    const maxElasticity = 2;
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
        const distance = Math.sqrt(
          Math.pow(r1.x - r2.x, 2) + Math.pow(r1.y - r2.y, 2)
        );
        const elasticity = Math.max(
          minElasticity,
          Math.min(
            maxElasticity,
            baseElasticity / (distance / baseElasticLength)
          )
        );
        return {
          elasticity,
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
    <>
      <div className="svgfilters-editor__cables-ui__debug">
        Renders: {renders}
      </div>
      <svg id="cables-ui" className="svgfilters-editor__cables-ui">
        {cablesCoordinates.map((cablesCoordinate, index) => {
          const {
            elasticity,
            sourceCoords: source,
            targetCoords: target,
          } = cablesCoordinate;
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
    </>
  );
};
