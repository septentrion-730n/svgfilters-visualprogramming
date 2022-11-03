import { useDrag } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/web";

import "./FilterBlock.scss";
import { useCablesUIContext } from "./CablesUIProvider";

export const FilterBlock = (props: FilterBlockProps) => {
  const { id } = props;

  const { startAnimation, stopAnimation } = useCablesUIContext();

  const [{ x, y }, api] = useSpring(() => ({
    x: props.x ?? 0,
    y: props.y ?? 0,
  }));

  const bind = useDrag((gesture) => {
    api.start({
      to: {
        x: (props.x ?? 0) + gesture.offset[0],
        y: (props.y ?? 0) + gesture.offset[1],
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
        <Connector id={`${id}_4`} />
        <Connector id={`${id}_5`} />
      </div>
      <div
        className="filter-block__drag-anchor"
        {...bind()}
        onMouseDown={() => startAnimation()}
        onMouseUp={() => stopAnimation()}
      />
      <div>Title {id}</div>
    </animated.div>
  );
};

const Connector = (props: { id: string }) => {
  return <div id={props.id} className="__item no-drag" />;
};

export type FilterBlockProps = {
  id: string;
  x?: number;
  y?: number;
};
