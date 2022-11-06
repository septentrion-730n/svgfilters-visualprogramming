import { useDrag } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/web";

import "./Brick.scss";
import { useEditorContext } from "../editor/EditorContextProvider";
import { BrickData, ConnectorData, connectorDataGetId } from "../types";

export const Brick = (props: BrickProps) => {
  const {
    brick,
    brick: { id, position, label },
  } = props;

  const { selectedBrick, setSelectedBrick } = useEditorContext();

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
      config: { damping: 0.92, mass: 1, tension: 200, friction: 15 },
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
        <Connector data={{ brickId: id, connectorId: "in1" }} />
        <Connector data={{ brickId: id, connectorId: "in2" }} />
      </div>
      <div className="__input-connectors mod--output">
        <Connector data={{ brickId: id, connectorId: "out1" }} />
      </div>
      <div className="__drag-anchor" {...bind()} />
      <h5 className="text-center">{label ?? id}</h5>
    </animated.div>
  );
};

const Connector = (props: ConnectorProps) => {
  return <div id={connectorDataGetId(props.data)} className="__item no-drag" />;
};

type ConnectorProps = {
  data: ConnectorData;
};

export type BrickProps = {
  brick: BrickData;
};
