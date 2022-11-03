import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

export const AppHeader = () => {
  return (
    <Navbar bg="dark" variant="dark" className="app-header">
      <Container fluid>
        <Navbar.Brand href="#home">SVG Filters editor</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text></Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
