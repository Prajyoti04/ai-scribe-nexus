
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  isAuthenticated?: boolean;
}

export default function Layout({ children, isAuthenticated }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar isAuthenticated={isAuthenticated} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
