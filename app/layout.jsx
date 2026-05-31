import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import WireframeGrid from "@/components/WireframeGrid";

export const metadata = {
  title: "Ylex Media — Interactive Blueprint Agency",
  description:
    "Ylex Media: we build digital assets for brands who hate looking boring. Blueprint wireframe UI, buttery animations, and deliberate chaos.",
  icons: [{ rel: "icon", url: "/favicon.svg", type: "image/svg+xml" }],
  openGraph: {
    title: "Ylex Media",
    description: "Blueprint UI. CAD energy. Unreasonably smooth.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-blueprint min-h-dvh overflow-x-hidden font-sans antialiased selection:bg-blueprint-neon/30 selection:text-blueprint-ink">
        <WireframeGrid />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
