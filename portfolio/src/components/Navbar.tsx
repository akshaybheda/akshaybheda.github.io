// Navbar.tsx
import { Navbar, Nav, Button } from "react-bootstrap";

export default function AppNavbar() {
  const toggleDarkMode = () => {
    if (document.documentElement.getAttribute("data-bs-theme") == "dark") {
      document.documentElement.setAttribute("data-bs-theme", "light");
    } else {
      document.documentElement.setAttribute("data-bs-theme", "dark");
    }
  };
  return (
    <Navbar>
      <Nav className="ms-auto">
        <Button className="btn btn-dark shadow" onClick={toggleDarkMode}>
          Toggle Dark Mode
        </Button>
        <Nav.Link className="" href="">
          Home
        </Nav.Link>
        <Nav.Link href="projects">Projects</Nav.Link>
        <Nav.Link href="contact">Contact</Nav.Link>
      </Nav>
    </Navbar>
  );
}
