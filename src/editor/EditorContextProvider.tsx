import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import {
  BrickData,
  BrickTypes,
  ConnectionData,
  ConnectionSelectionData,
} from "../model";

const EditorContext = createContext<EditorContextData | null>(null);

export const EditorContextProvider = (props: EditorContextProviderProps) => {
  const [bricks, setBricks] = useState<BrickData<BrickTypes>[]>(
    props.bricks ?? []
  );

  const updateConnectionsFromBricks = useCallback(() => {
    return bricks.flatMap((brick) => {
      return brick.outputsTo.map((outputTo) => ({
        output: {
          brickId: brick.id,
          connectorId: "out",
        },
        input: outputTo,
      }));
    });
  }, [bricks]);

  console.log(updateConnectionsFromBricks());

  const [connections, setConnections] = useState<ConnectionData[]>(
    updateConnectionsFromBricks()
  );

  const [showCompositionPanel, setShowCompositionPanel] =
    useState<boolean>(false);
  const [showEditionPanel, setShowEditionPanel] = useState<boolean>(false);
  const [selectedBrick, setSelectedBrick] =
    useState<BrickData<BrickTypes> | null>(null);
  const [connectionSelection, setConnectionSelection] =
    useState<ConnectionSelectionData>({ input: null, output: null });

  const addBrick = useCallback(
    (brick: BrickData<BrickTypes>) => {
      setBricks([...bricks, brick]);
    },
    [bricks, setBricks]
  );

  const removeBrick = useCallback(
    (brick: BrickData<BrickTypes>) => {
      const index = findBrickIndex(bricks, brick);
      if (index === -1)
        setBricks([...bricks.slice(0, index), ...bricks.slice(index + 1)]);
    },
    [bricks, setBricks]
  );

  const addConnection = useCallback(
    (connection: ConnectionData) => {
      // todo: update  bricks, regenerate connections
      setConnections(updateConnectionsFromBricks());
    },
    [updateConnectionsFromBricks]
  );

  const removeConnection = useCallback(
    (connection: ConnectionData) => {
      // todo: update  bricks, regenerate connections
      setConnections(updateConnectionsFromBricks());
    },
    [updateConnectionsFromBricks]
  );

  const updateConnectionSelection = useCallback(
    (connectionSelectionUpdates: Partial<ConnectionSelectionData>) => {
      setConnectionSelection({
        ...connectionSelection,
        ...connectionSelectionUpdates,
      });
    },
    [connectionSelection]
  );

  const composedSetSelectedBrick = useCallback(
    (brick: BrickData<BrickTypes> | null) => {
      if (selectedBrick && brick && brick.id === selectedBrick?.id) return;
      setSelectedBrick(brick);
      setShowEditionPanel(!!brick);
    },
    [setSelectedBrick, setShowEditionPanel, selectedBrick]
  );

  const contextValues = useMemo(() => {
    return {
      connections: connections,
      addConnection: addConnection,
      removeConnection: removeConnection,
      bricks,
      addBrick,
      removeBrick,
      selectedBrick,
      setSelectedBrick: composedSetSelectedBrick,
      connectionSelection,
      updateConnectionSelection,
      setShowEditionPanel,
      showEditionPanel,
      showCompositionPanel,
      setShowCompositionPanel,
    };
  }, [
    connections,
    addConnection,
    removeConnection,
    bricks,
    addBrick,
    removeBrick,
    selectedBrick,
    composedSetSelectedBrick,
    connectionSelection,
    updateConnectionSelection,
    showEditionPanel,
    showCompositionPanel,
  ]);

  return (
    <EditorContext.Provider value={contextValues}>
      {props.children}
    </EditorContext.Provider>
  );
};

export type EditorContextData = {
  // connections
  connections: ConnectionData[];
  addConnection: (connection: ConnectionData) => void;
  removeConnection: (connection: ConnectionData) => void;
  // bricks
  bricks: BrickData<BrickTypes>[];
  addBrick: (brick: BrickData<BrickTypes>) => void;
  removeBrick: (brick: BrickData<BrickTypes>) => void;
  // selectedBrick
  selectedBrick: BrickData<BrickTypes> | null;
  setSelectedBrick: (brick: BrickData<BrickTypes> | null) => void;
  // connectionSelection
  connectionSelection: ConnectionSelectionData;
  updateConnectionSelection: (
    connectionSelectionUpdates: Partial<ConnectionSelectionData>
  ) => void;
  // editionPanel
  showEditionPanel: boolean;
  setShowEditionPanel: (status: boolean) => void;
  //compositionPanel
  showCompositionPanel: boolean;
  setShowCompositionPanel: (status: boolean) => void;
};

export type EditorContextProviderProps = {
  bricks?: BrickData<BrickTypes>[];
  children: ReactNode;
};

export const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (context === null)
    throw new Error(
      "useEditorContext must be used within a EditorContext.Provider"
    );
  return context;
};

export const findConnectionIndex = (
  connections: ConnectionData[],
  needleConnection: ConnectionData
) =>
  connections.findIndex(
    (connection) =>
      connection.input.brickId === needleConnection.input.brickId &&
      connection.output.brickId === needleConnection.output.brickId
  );

export const findBrickIndex = (
  bricks: BrickData<BrickTypes>[],
  needleBrick: BrickData<BrickTypes>
) => bricks.findIndex((brick) => brick.id === needleBrick.id);
