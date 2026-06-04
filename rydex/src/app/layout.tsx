import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/lib/Provider";
import ReduxProvider from "@/redux/ReduxProvider";
import InitUser from "@/InitUser";
import "leaflet/dist/leaflet.css"

export const metadata: Metadata = {
  title: "Rydex - Smart Vechile Booking Platform",
  description:
    "Rydex is a modern ride-hailing and partner management platform developed using Next.js and TypeScript. It is designed not only to help riders book vehicles quickly but also to create a highly secure, transparent, and trust-driven ecosystem for both riders and drivers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className="min-h-full flex flex-col">
        <Provider>
          <ReduxProvider>
            <InitUser />
            {children}
          </ReduxProvider>
        </Provider>
      </body>
    </html>
  );
}
