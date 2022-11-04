import { useDrag } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/web";

import "./EditorBrick.scss";
import { useEditorContext } from "../editor/EditorContextProvider";
import { Brick } from "../types";

export const BrickWrapper = (props: BrickWrapperProps) => {
  const {
    brick,
    brick: { id, position },
  } = props;

  const { startAnimation, stopAnimation, selectedBrick, setSelectedBrick } =
    useEditorContext();

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
    <animated.div
      id={id}
      className={`editor-brick ${
        selectedBrick?.id === id ? "mod--selected" : ""
      }`}
      style={{ x, y }}
      onMouseDown={() => {
        setSelectedBrick(brick);
      }}
    >
      <div className="__input-connectors">
        <Connector id={`${id}_1`} />
        <Connector id={`${id}_2`} />
      </div>
      <div className="__input-connectors mod--output">
        <Connector id={`${id}_3`} />
      </div>
      <div
        className="__drag-anchor"
        {...bind()}
        onMouseDown={() => startAnimation()}
        onMouseUp={() => {
          setTimeout(() => stopAnimation(), 1000);
        }}
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
