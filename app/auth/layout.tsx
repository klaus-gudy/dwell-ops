import Link from "next/link";
import { Toaster } from "@/components/ui/sonner"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary to-secondary">
      <header className="sticky top-0 z-50 w-full bg-transparent backdrop-blur-sm">
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold transition-colors text-primary-foreground hover:text-accent-foreground">
              Dwell-ops
            </Link>
          </div>
        </div>
      </header>
      <main className="flex items-center justify-center flex-grow p-4">
        {children}
      </main>
      <Toaster />
    </div>
  );
};

export default AuthLayout;
