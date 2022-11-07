export type ConnectorData = {
  brickId: string;
  connectorId: string;
};

export type ConnectionData = {
  input: ConnectorData;
  output: ConnectorData;
};

export type ConnectionSelectionData = {
  input: ConnectorData | null;
  output: ConnectorData | null;
};

export const connectorDataGetDOMId = (connectorData: ConnectorData) => {
  return `${connectorData.brickId}_${connectorData.connectorId}`;
};
