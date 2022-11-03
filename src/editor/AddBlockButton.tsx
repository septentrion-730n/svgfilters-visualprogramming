import { useState } from "react";

import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

export const AddBlockButton = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="svgfilters-editor__add-block-button">
        <Button variant="secondary" onClick={handleShow}>
          Add block
        </Button>
      </div>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
