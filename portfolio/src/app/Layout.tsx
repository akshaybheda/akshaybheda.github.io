import Navbar from "../components/NavBar/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      {children}
    </div>
  );
}
