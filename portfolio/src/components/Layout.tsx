import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      {children}
      {/* <footer className="text-center py-2">© 2025 My Portfolio</footer> */}
    </div>
  );
}