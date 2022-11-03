import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import { Cable } from "../types";

const CablesUIContext = createContext<CablesUIContextData | null>(null);

export const CablesUIContextProvider = (props: {
  cables?: Cable[];
  children: ReactNode;
}) => {
  const [cables, setCables] = useState<Cable[]>(props.cables ?? []);
  const [shouldAnimate, setShouldAnimate] = useState(false);

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
      if (index === -1) setCables([...cables, cable]);
    },
    [cables, setCables]
  );

  const contextValues = useMemo(() => {
    return {
      cables,
      addCable,
      removeCable,
      shouldAnimate,
      startAnimation: () => setShouldAnimate(true),
      stopAnimation: () => setShouldAnimate(false),
    };
  }, [cables, addCable, removeCable, shouldAnimate]);

  return (
    <CablesUIContext.Provider value={contextValues}>
      {props.children}
    </CablesUIContext.Provider>
  );
};

export const useCablesUIContext = () => {
  const context = useContext(CablesUIContext);
  if (context === null)
    throw new Error(
      "useCablesUIContext must be used within a CablesUIContext.Provider"
    );
  return context;
};

export type CablesUIProps = {
  children: ReactNode;
};

export type CablesUIContextData = {
  cables: Cable[];
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
