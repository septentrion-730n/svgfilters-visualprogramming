import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import { BrickData, ConnectionData, ConnectionSelectionData } from "../types";

const EditorContext = createContext<EditorContextData | null>(null);

export const EditorContextProvider = (props: EditorContextProviderProps) => {
  const [connections, setConnections] = useState<ConnectionData[]>(
    props.connections ?? []
  );
  const [bricks, setBricks] = useState<BrickData[]>(props.bricks ?? []);

  const [showCompositionPanel, setShowCompositionPanel] =
    useState<boolean>(false);
  const [showEditionPanel, setShowEditionPanel] = useState<boolean>(false);
  const [selectedBrick, setSelectedBrick] = useState<BrickData | null>(null);
  const [connectionSelection, setConnectionSelection] =
    useState<ConnectionSelectionData>({ in: null, out: null });

  const addBrick = useCallback(
    (brick: BrickData) => {
      setBricks([...bricks, brick]);
    },
    [bricks, setBricks]
  );

  const removeBrick = useCallback(
    (brick: BrickData) => {
      const index = findBrickIndex(bricks, brick);
      if (index === -1)
        setBricks([...bricks.slice(0, index), ...bricks.slice(index + 1)]);
    },
    [bricks, setBricks]
  );

  const addConnection = useCallback(
    (connection: ConnectionData) => {
      const index = findConnectionIndex(connections, connection);
      if (index === -1) setConnections([...connections, connection]);
    },
    [connections, setConnections]
  );

  const removeConnection = useCallback(
    (connection: ConnectionData) => {
      const index = findConnectionIndex(connections, connection);
      if (index === -1)
        setConnections([
          ...connections.slice(0, index),
          ...connections.slice(index + 1),
        ]);
    },
    [connections, setConnections]
  );

  const removeConnectionSelection = useCallback(
    (connectionSelectionUpdates: Partial<ConnectionSelectionData>) => {
      setConnectionSelection({
        ...connectionSelection,
        ...connectionSelectionUpdates,
      });
    },
    [connectionSelection]
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
      setSelectedBrick,
      connectionSelection,
      updateConnectionSelection: removeConnectionSelection,
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
    connectionSelection,
    removeConnectionSelection,
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
  bricks: BrickData[];
  addBrick: (brick: BrickData) => void;
  removeBrick: (brick: BrickData) => void;
  // selectedBrick
  selectedBrick: BrickData | null;
  setSelectedBrick: (brick: BrickData | null) => void;
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
  connections?: ConnectionData[];
  bricks?: BrickData[];
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
      connection.in.brickId === needleConnection.in.brickId &&
      connection.out.brickId === needleConnection.out.brickId
  );

export const findBrickIndex = (bricks: BrickData[], needleBrick: BrickData) =>
  bricks.findIndex((brick) => brick.id === needleBrick.id);
