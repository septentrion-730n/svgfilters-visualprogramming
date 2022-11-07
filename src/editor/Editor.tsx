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
            type: "source",
            config: {
              type: "mixed",
            },
            outputsTo: [{ brickId: "item4", connectorId: "in1" }],
          },
          {
            id: "item2",
            position: [50, 250],
            type: "source",
            config: {
              type: "photo",
            },
            outputsTo: [{ brickId: "item4", connectorId: "in2" }],
          },
          {
            id: "item3",
            position: [350, 50],
            type: "feFlood",
            config: {
              color: "#cc3399",
              opacity: 1,
              x: 0,
              y: 0,
              width: 100,
              height: 100,
            },
            outputsTo: [{ brickId: "item5", connectorId: "in2" }],
          },
          {
            id: "item4",
            position: [350, 250],
            type: "feBlend",
            config: {
              mode: "color-burn",
              x: 0,
              y: 0,
              width: 100,
              height: 100,
            },
            outputsTo: [{ brickId: "item5", connectorId: "in1" }],
          },
          {
            id: "item5",
            position: [650, 125],
            type: "feBlend",
            config: {
              mode: "multiply",
              x: 0,
              y: 0,
              width: 100,
              height: 100,
            },
            outputsTo: [],
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
