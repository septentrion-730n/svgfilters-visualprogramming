import Nav from "react-bootstrap/Nav";

export const ActionsBar = () => {
  return (
    <Nav variant="pills" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link href="/home">Add brick</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link disabled>Export</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};
