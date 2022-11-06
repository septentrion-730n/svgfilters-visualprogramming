import { useDrag } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/web";

import "./Brick.scss";
import { useEditorContext } from "../editor/EditorContextProvider";
import {
  BrickData,
  BricksTypesConfig,
  ConnectorData,
  connectorDataGetId,
} from "../types";

export const Brick = (props: BrickProps) => {
  const {
    brick,
    brick: { id, position, label, brickType },
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
        {BricksTypesConfig[brickType].in.map((connectorId) => (
          <Connector data={{ brickId: id, connectorId }} />
        ))}
      </div>
      <div className="__input-connectors mod--output">
        <Connector data={{ brickId: id, connectorId: "out" }} />
      </div>
      <div className="__drag-anchor" {...bind()} />
      <h5>
        {BricksTypesConfig[brickType].icon({ size: 34 })} {label ?? id}
      </h5>
      <div className="__preview"></div>
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
