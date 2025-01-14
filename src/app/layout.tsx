import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Bridge Care",
  description: "Healthcare Services",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="fixed top-0 left-0 right-0 z-[9999] bg-green-600 text-white flex justify-between items-center p-4">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Bridge Care Logo"
              className="h-10 w-10"
              width={100}
              height={100}
            />
            <p className="text-lg font-semibold">Bridge Care</p>
          </div>
        </header>
        <main className="container mx-auto my-16 p-6 h-full">{children}</main>
        <footer className="fixed bottom-0 left-0 right-0 z-[9999] bg-green-600 text-white text-center py-2 mt-8">
          &copy; 2025 Bridge Care
        </footer>
      </body>
    </html>
  );
}
