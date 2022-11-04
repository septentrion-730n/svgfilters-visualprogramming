import { Button, ButtonGroup } from "react-bootstrap";
import { useEditorContext } from "./EditorContextProvider";

export const ActionsBar = () => {
  const { setShowCompositionPanel } = useEditorContext();
  return (
    <ButtonGroup size="sm" className="p-2">
      <Button variant="secondary" onClick={() => setShowCompositionPanel(true)}>
        Add group
      </Button>
    </ButtonGroup>
  );
};
