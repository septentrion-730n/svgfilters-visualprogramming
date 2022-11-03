import { CablesUI } from "./CablesUI";
import { CablesUIContextProvider } from "./CablesUIProvider";
import { FilterBlock } from "./FilterBlock";
import { AddBlockButton } from "./AddBlockButton";
import "./Editor.scss";

export const Editor = () => {
  return (
    <div className="svgfilters-editor">
      <CablesUIContextProvider
        cables={[
          {
            sourceId: "item1_3",
            targetId: "item2_1",
          },
          {
            sourceId: "item1_3",
            targetId: "item3_1",
          },
        ]}
      >
        <AddBlockButton />
        <CablesUI />
        <FilterBlock {...{ id: "item1", x: 100, y: 20 }} />
        <FilterBlock {...{ id: "item2", x: 450, y: 20 }} />
        <FilterBlock {...{ id: "item3", x: 450, y: 350 }} />
      </CablesUIContextProvider>
    </div>
  );
};
