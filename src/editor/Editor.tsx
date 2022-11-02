import { FilterBlock } from "./FilterBlock";

export const Editor = () => {
  return (
    <div className="svgfilters-editor">
      <FilterBlock {...{ id: "item1", x: 100, y: 300 }} />
      <FilterBlock {...{ id: "item2", x: 400, y: 600 }} />
      <FilterBlock {...{ id: "item3" }} />
    </div>
  );
};
