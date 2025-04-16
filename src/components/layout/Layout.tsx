
import { ReactNode, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  isAuthenticated?: boolean;
}

export default function Layout({ children, isAuthenticated: propIsAuthenticated }: LayoutProps) {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(propIsAuthenticated);

  useEffect(() => {
    // Check if user is authenticated from localStorage
    const user = localStorage.getItem("techoh-user");
    if (user) {
      setIsUserAuthenticated(true);
    }
  }, [propIsAuthenticated]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar isAuthenticated={isUserAuthenticated} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
