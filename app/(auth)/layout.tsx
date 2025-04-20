import Link from "next/link";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 to-ocean-600 flex flex-col">
      <header className="sticky top-0 z-50 w-full bg-transparent backdrop-blur-sm dark:bg-gray-900/30">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary">
              Dwell-ops
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center p-4">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
