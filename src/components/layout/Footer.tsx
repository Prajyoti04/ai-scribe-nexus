
import { Link } from "react-router-dom";
import { Twitter, Github, Linkedin, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30 py-12">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-baseline gap-1 text-2xl font-bold">
              <span className="gradient-text">Tech-OH</span>
              <span className="text-foreground">Blog</span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              The ultimate platform for technical content creators and readers in 2025.
            </p>
            <div className="mt-4 flex items-center space-x-4">
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-medium">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="transition-colors hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/trending" className="transition-colors hover:text-foreground">
                  Trending
                </Link>
              </li>
              <li>
                <Link to="/topics" className="transition-colors hover:text-foreground">
                  Topics
                </Link>
              </li>
              <li>
                <Link to="/authors" className="transition-colors hover:text-foreground">
                  Authors
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-medium">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  API
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  Tutorials
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  Community
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-medium">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border/40 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Tech-OH Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
