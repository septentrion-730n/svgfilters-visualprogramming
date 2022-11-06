import { ConnectionsDrawer } from "./ConnectionsDrawer";
import {
  EditorContextProvider,
  useEditorContext,
} from "./EditorContextProvider";
import { Brick } from "../bricks/Brick";
import { ActionsBar } from "./ActionsBar";
import { CompositionPanel } from "./CompositionPanel";
import { EditionPanel } from "./EditionPanel";

import "./Editor.scss";

export const Editor = () => {
  return (
    <div className="svgfilters-editor">
      <EditorContextProvider
        bricks={[
          {
            id: "item1",
            position: [50, 50],
            label: "test",
            brickType: "source",
          },
          { id: "item2", position: [50, 250], brickType: "source" },
          { id: "item3", position: [350, 50], brickType: "feFlood" },
          { id: "item4", position: [350, 250], brickType: "feBlend" },
          { id: "item5", position: [650, 125], brickType: "feBlend" },
        ]}
        connections={[
          {
            out: { brickId: "item1", connectorId: "out" },
            in: { brickId: "item4", connectorId: "in1" },
          },
          {
            out: { brickId: "item2", connectorId: "out" },
            in: { brickId: "item4", connectorId: "in2" },
          },
          {
            out: { brickId: "item4", connectorId: "out" },
            in: { brickId: "item5", connectorId: "in1" },
          },
          {
            out: { brickId: "item3", connectorId: "out" },
            in: { brickId: "item5", connectorId: "in2" },
          },
        ]}
      >
        <ActionsBar />
        <CompositionPanel />
        <EditionPanel />
        <ConnectionsDrawer />
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
        <Brick key={brick.id} brick={brick} />
      ))}
    </>
  );
};
