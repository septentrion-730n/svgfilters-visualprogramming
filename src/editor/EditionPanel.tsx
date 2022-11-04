import Offcanvas from "react-bootstrap/Offcanvas";
import { useEditorContext } from "./EditorContextProvider";

export const EditionPanel = () => {
  const { showEditionPanel, setShowEditionPanel, selectedBrick } =
    useEditorContext();

  if (!selectedBrick) return null;

  return (
    <Offcanvas
      placement="end"
      scroll={true}
      backdrop={false}
      show={showEditionPanel}
      onHide={() => setShowEditionPanel(false)}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Brick edition</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        Coucou {selectedBrick.label} - {selectedBrick.id}
      </Offcanvas.Body>
    </Offcanvas>
  );
};
