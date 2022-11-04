import { CablesUI } from "./CablesUI";
import {
  EditorContextProvider,
  useEditorContext,
} from "./EditorContextProvider";
import { BrickWrapper } from "../bricks/EditorBrick";
import "./Editor.scss";
import { ActionsBar } from "./ActionsBar";
import { CompositionPanel } from "./CompositionPanel";
import { EditionPanel } from "./EditionPanel";

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
        <ActionsBar />
        <CompositionPanel />
        <EditionPanel />
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
