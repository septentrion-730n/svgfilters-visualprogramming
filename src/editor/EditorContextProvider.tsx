import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import { Brick, Cable } from "../types";

const EditorContext = createContext<EditorContextData | null>(null);

export const EditorContextProvider = (props: EditorContextProviderProps) => {
  const [cables, setCables] = useState<Cable[]>(props.cables ?? []);
  const [bricks, setBricks] = useState<Brick[]>(props.bricks ?? []);
  const [shouldAnimate, setShouldAnimate] = useState(false);

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

  const contextValues = useMemo(() => {
    return {
      cables,
      bricks,
      addBrick,
      removeBrick,
      addCable,
      removeCable,
      shouldAnimate,
      startAnimation: () => setShouldAnimate(true),
      stopAnimation: () => setShouldAnimate(false),
    };
  }, [
    cables,
    bricks,
    addBrick,
    removeBrick,
    addCable,
    removeCable,
    shouldAnimate,
  ]);

  return (
    <EditorContext.Provider value={contextValues}>
      {props.children}
    </EditorContext.Provider>
  );
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

export type EditorContextData = {
  cables: Cable[];
  addBrick: (brick: Brick) => void;
  addCable: (cable: Cable) => void;
  removeCable: (cable: Cable) => void;
  shouldAnimate: boolean;
  startAnimation: () => void;
  stopAnimation: () => void;
};

export const findCableIndex = (cables: Cable[], needleCable: Cable) =>
  cables.findIndex(
    (cable) =>
      cable.sourceId === needleCable.sourceId &&
      cable.targetId === needleCable.targetId
  );

export const findBrickIndex = (bricks: Brick[], needleBrick: Brick) =>
  bricks.findIndex((brick) => brick.id === needleBrick.id);
