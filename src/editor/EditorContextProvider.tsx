import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import { Brick, Cable, ConnectorSelection } from "../types";

const EditorContext = createContext<EditorContextData | null>(null);

export const EditorContextProvider = (props: EditorContextProviderProps) => {
  const [cables, setCables] = useState<Cable[]>(props.cables ?? []);
  const [bricks, setBricks] = useState<Brick[]>(props.bricks ?? []);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const [showCompositionPanel, setShowCompositionPanel] =
    useState<boolean>(false);
  const [showEditionPanel, setShowEditionPanel] = useState<boolean>(false);
  const [selectedBrick, setSelectedBrick] = useState<Brick | null>(null);
  const [connectorSelection, setConnectorSelection] =
    useState<ConnectorSelection>({ in: null, out: null });

  const addBrick = useCallback(
    (brick: Brick) => {
      setBricks([...bricks, brick]);
    },
    [bricks, setBricks]
  );

  const removeBrick = useCallback(
    (brick: Brick) => {
      const index = findBrickIndex(bricks, brick);
      if (index === -1)
        setBricks([...bricks.slice(0, index), ...bricks.slice(index + 1)]);
    },
    [bricks, setBricks]
  );

  const addCable = useCallback(
    (cable: Cable) => {
      const index = findCableIndex(cables, cable);
      if (index === -1) setCables([...cables, cable]);
    },
    [cables, setCables]
  );

  const removeCable = useCallback(
    (cable: Cable) => {
      const index = findCableIndex(cables, cable);
      if (index === -1)
        setCables([...cables.slice(0, index), ...cables.slice(index + 1)]);
    },
    [cables, setCables]
  );

  const updateConnectorSelection = useCallback(
    (connectorSelectionUpdates: Partial<ConnectorSelection>) => {
      setConnectorSelection({
        ...connectorSelection,
        ...connectorSelectionUpdates,
      });
    },
    [connectorSelection]
  );

  const contextValues = useMemo(() => {
    return {
      cables,
      addCable,
      removeCable,
      bricks,
      addBrick,
      removeBrick,
      selectedBrick,
      setSelectedBrick,
      connectorSelection,
      updateConnectorSelection,
      setShowEditionPanel,
      showEditionPanel,
      showCompositionPanel,
      setShowCompositionPanel,
      shouldAnimate,
      startAnimation: () => setShouldAnimate(true),
      stopAnimation: () => setShouldAnimate(false),
    };
  }, [
    cables,
    addCable,
    removeCable,
    bricks,
    addBrick,
    removeBrick,
    selectedBrick,
    connectorSelection,
    updateConnectorSelection,
    showEditionPanel,
    showCompositionPanel,
    shouldAnimate,
  ]);

  return (
    <EditorContext.Provider value={contextValues}>
      {props.children}
    </EditorContext.Provider>
  );
};

export type EditorContextData = {
  // cables
  cables: Cable[];
  addCable: (cable: Cable) => void;
  removeCable: (cable: Cable) => void;
  // bricks
  bricks: Brick[];
  addBrick: (brick: Brick) => void;
  removeBrick: (brick: Brick) => void;
  // selectedBrick
  selectedBrick: Brick | null;
  setSelectedBrick: (brick: Brick | null) => void;
  // connectorSelection
  connectorSelection: ConnectorSelection;
  updateConnectorSelection: (
    connectionSelectionUpdates: Partial<ConnectorSelection>
  ) => void;
  // editionPanel
  showEditionPanel: boolean;
  setShowEditionPanel: (status: boolean) => void;
  //compositionPanel
  showCompositionPanel: boolean;
  setShowCompositionPanel: (status: boolean) => void;
  // animation
  shouldAnimate: boolean;
  startAnimation: () => void;
  stopAnimation: () => void;
};

export type EditorContextProviderProps = {
  cables?: Cable[];
  bricks?: Brick[];
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

export const findCableIndex = (cables: Cable[], needleCable: Cable) =>
  cables.findIndex(
    (cable) =>
      cable.sourceId === needleCable.sourceId &&
      cable.targetId === needleCable.targetId
  );

export const findBrickIndex = (bricks: Brick[], needleBrick: Brick) =>
  bricks.findIndex((brick) => brick.id === needleBrick.id);
