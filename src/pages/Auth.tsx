
import Layout from "@/components/layout/Layout";
import AuthForm from "@/components/auth/AuthForm";
import { useLocation } from "react-router-dom";

export default function Auth() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <Layout>
      <div className="container max-w-6xl py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="hidden md:block">
            <div className="flex h-full flex-col justify-center space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">
                  <span className="gradient-text">Tech-OH</span> Blog
                </h1>
                <p className="text-xl text-muted-foreground">
                  The ultimate platform for technical content creators and readers in 2025
                </p>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-techoh-purple/10 text-techoh-purple">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5.8 11.3 2 22l10.7-3.79" />
                      <path d="M4 3h.01" />
                      <path d="M22 8h.01" />
                      <path d="M15 2h.01" />
                      <path d="M22 20h.01" />
                      <path d="m22 2-17 7 10 5 7-17Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">AI Writing Assistant</h3>
                    <p className="text-sm">
                      Get help with grammar, SEO optimization, and content improvements
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-techoh-purple/10 text-techoh-purple">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Community & Collaboration</h3>
                    <p className="text-sm">
                      Connect with like-minded tech professionals and co-author articles
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-techoh-purple/10 text-techoh-purple">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 3v18h18" />
                      <path d="m7 8 4.375-4.375L18 8" />
                      <path d="m7 12 4.375-4.375L18 12" />
                      <path d="m7 16 4.375-4.375L18 16" />
                      <path d="m7 20 4.375-4.375L18 20" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Detailed Analytics</h3>
                    <p className="text-sm">
                      Get insights into your content performance and reader behavior
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-border/40 bg-card p-8">
            <AuthForm type={isLoginPage ? "login" : "register"} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
