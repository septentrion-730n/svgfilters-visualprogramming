import { ListGroup } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useEditorContext } from "./EditorContextProvider";

export const CompositionPanel = () => {
  const { showCompositionPanel, setShowCompositionPanel } = useEditorContext();
  return (
    <Offcanvas
      show={showCompositionPanel}
      onHide={() => setShowCompositionPanel(false)}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Add a new brick</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ListGroup>
          <ListGroup.Item>Source</ListGroup.Item>
          <ListGroup.Item>Flood</ListGroup.Item>
          <ListGroup.Item>Blend</ListGroup.Item>
        </ListGroup>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
