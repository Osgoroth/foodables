// import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./Providers";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Foodables",
  description: "The next(js) recipe app.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <Providers>
            <NavBar />
            {children}
          </Providers>
        </main>
      </body>
    </html>
  );
}
