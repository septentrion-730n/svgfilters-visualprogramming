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
          { id: "item1", position: [100, 40], label: "test" },
          { id: "item2", position: [450, 40] },
          { id: "item3", position: [450, 350] },
        ]}
        connections={[
          {
            out: { brickId: "item1", connectorId: "out1" },
            in: { brickId: "item2", connectorId: "in1" },
          },
          {
            out: { brickId: "item1", connectorId: "out1" },
            in: { brickId: "item3", connectorId: "in1" },
          },
          {
            out: { brickId: "item2", connectorId: "out1" },
            in: { brickId: "item1", connectorId: "in1" },
          },
          {
            out: { brickId: "item3", connectorId: "out1" },
            in: { brickId: "item2", connectorId: "in2" },
          },
          {
            out: { brickId: "item2", connectorId: "out1" },
            in: { brickId: "item3", connectorId: "in2" },
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
