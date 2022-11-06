import { Button, ButtonGroup } from "react-bootstrap";
import { useEditorContext } from "./EditorContextProvider";

export const ActionsBar = () => {
  const { setShowCompositionPanel } = useEditorContext();
  return (
    <div className="editor__action-bar">
      <ButtonGroup className="p-2" size="sm">
        <Button
          variant="secondary"
          onClick={() => setShowCompositionPanel(true)}
        >
          Add group
        </Button>
      </ButtonGroup>
    </div>
  );
};
