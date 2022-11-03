import { useDrag } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/web";

import "./BrickWrapper.scss";
import { useEditorContext } from "../editor/EditorContextProvider";
import { Brick } from "../types";

export const BrickWrapper = (props: BrickWrapperProps) => {
  const {
    brick: { id, position },
  } = props;

  const { startAnimation, stopAnimation } = useEditorContext();

  const [{ x, y }, api] = useSpring(() => ({
    x: position[0] ?? 0,
    y: position[1] ?? 0,
  }));

  const bind = useDrag((gesture) => {
    api.start({
      to: {
        x: (position[0] ?? 0) + gesture.offset[0],
        y: (position[1] ?? 0) + gesture.offset[1],
      },
    });
  });

  return (
    <animated.div id={id} className="filter-block" style={{ x, y }}>
      <div className="filter-block__input-connectors">
        <Connector id={`${id}_1`} />
        <Connector id={`${id}_2`} />
      </div>
      <div className="filter-block__input-connectors mod--output">
        <Connector id={`${id}_3`} />
      </div>
      <div
        className="filter-block__drag-anchor"
        {...bind()}
        onMouseDown={() => startAnimation()}
        onMouseUp={() => stopAnimation()}
      />
      <h5 className="text-center">{id}</h5>
    </animated.div>
  );
};

const Connector = (props: { id: string }) => {
  return <div id={props.id} className="__item no-drag" />;
};

export type BrickWrapperProps = {
  brick: Brick;
};
