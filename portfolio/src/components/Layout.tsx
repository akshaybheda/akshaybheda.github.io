import Navbar from "./Navbar";
import Container from "react-bootstrap/Container";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <Container fluid>{children}</Container>
      {/* <footer className="text-center py-2">© 2025 My Portfolio</footer> */}
    </div>
  );
}