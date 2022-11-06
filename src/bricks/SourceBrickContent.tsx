import { Form } from "react-bootstrap";

export const SourceBrickContent = () => {
  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="label">
          <Form.Label>Brick ID</Form.Label>
          <Form.Control type="text" placeholder="Brick unique ID" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="type">
          <Form.Label>Source type</Form.Label>
          <Form.Select>
            <option>Image</option>
            <option>Illustration</option>
            <option>Mixed content</option>
            <option>Video</option>
          </Form.Select>
        </Form.Group>
      </Form>
    </>
  );
};
