import { CablesUI } from "./CablesUI";
import { EditorContextProvider } from "./EditorContextProvider";
import { BrickWrapper } from "../bricks/BrickWrapper";
import { AddBlockButton } from "./AddBlockButton";
import "./Editor.scss";

export const Editor = () => {
  return (
    <div className="svgfilters-editor">
      <EditorContextProvider
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
        <BrickWrapper brick={{ id: "item1", position: [100, 40] }} />
        <BrickWrapper brick={{ id: "item2", position: [450, 40] }} />
        <BrickWrapper brick={{ id: "item3", position: [450, 350] }} />
      </EditorContextProvider>
    </div>
  );
};
