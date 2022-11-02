import { useDrag } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/web";
import "./FilterBlock.scss";

export const FilterBlock = (props: FilterBlockProps) => {
  const { id } = props;

  const [{ x, y }, api] = useSpring(() => ({
    x: props.x ?? 0,
    y: props.y ?? 0,
  }));

  const bind = useDrag((gesture) => {
    if ((gesture?.event?.target as HTMLElement)?.classList?.contains("no-drag"))
      return;
    api.start({
      to: {
        x: (props.x ?? 0) + gesture.offset[0],
        y: (props.y ?? 0) + gesture.offset[1],
      },
    });
  });

  return (
    <animated.div id={id} className="filter-block" style={{ x, y }} {...bind()}>
      <div className="filter-block__input-connectors">
        <Connector id={`${id}_1`} />
        <Connector id={`${id}_2`} />
      </div>
      <div className="filter-block__input-connectors mod--output">
        <Connector id={`${id}_3`} />
      </div>
      <div id={`${id}_inner`}>Title {id}</div>
    </animated.div>
  );
};

const Connector = (props: { id: string }) => {
  return (
    <div
      id={props.id}
      className="__item no-drag"
      onMouseDown={(event) => {
        console.log("onMouseDown");
        event.stopPropagation();
      }}
      onClick={(event) => {
        console.log("onClick");
        event.stopPropagation();
      }}
    />
  );
};

export type FilterBlockProps = {
  id: string;
  x?: number;
  y?: number;
};
