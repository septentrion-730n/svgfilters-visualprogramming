import { useDrag } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/web";

import "./Brick.scss";
import { useEditorContext } from "../editor/EditorContextProvider";
import {
  BrickData,
  BrickTypes,
  brickTypesDescriptions,
  ConnectorData,
  connectorDataGetDOMId,
} from "../model";

export const Brick = (props: BrickProps) => {
  const {
    brick,
    brick: { id, position, label, type },
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
        setSelectedBrick(brick as BrickData<BrickTypes>);
      }}
    >
      <div key="input-connectors-in" className="__input-connectors">
        {brickTypesDescriptions[type].inputs.map((connectorId) => (
          <Connector key={connectorId} data={{ brickId: id, connectorId }} />
        ))}
      </div>
      <div
        key="input-connectors-out"
        className="__input-connectors mod--output"
      >
        <Connector data={{ brickId: id, connectorId: "out" }} />
      </div>
      <div key="drag-anchor" className="__drag-anchor" {...bind()} />
      <h5>
        {brickTypesDescriptions[type].icon({ size: 34 })} {label ?? id}
      </h5>
    </animated.div>
  );
};

const Connector = (props: ConnectorProps) => {
  return (
    <div id={connectorDataGetDOMId(props.data)} className="__item no-drag" />
  );
};

type ConnectorProps = {
  data: ConnectorData;
};

export type BrickProps = {
  brick: BrickData<BrickTypes>;
};
