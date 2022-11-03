import { CablesUI } from "./CablesUI";
import {
  EditorContextProvider,
  useEditorContext,
} from "./EditorContextProvider";
import { BrickWrapper } from "../bricks/BrickWrapper";
import { AddBlockButton } from "./AddBlockButton";
import "./Editor.scss";

export const Editor = () => {
  return (
    <div className="svgfilters-editor">
      <EditorContextProvider
        bricks={[
          { id: "item1", position: [100, 40] },
          { id: "item2", position: [450, 40] },
          { id: "item3", position: [450, 350] },
        ]}
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
        <Bricks />
      </EditorContextProvider>
    </div>
  );
};

const Bricks = () => {
  const { bricks } = useEditorContext();
  return (
    <>
      {bricks.map((brick) => (
        <BrickWrapper key={brick.id} brick={brick} />
      ))}
    </>
  );
};
