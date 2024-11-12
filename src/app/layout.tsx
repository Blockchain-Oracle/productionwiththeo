import "~/styles/globals.css";

import "@uploadthing/react/styles.css";
import { type Metadata } from "next";
import { CSPostHogProvider } from "./_analytics/providers";

import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "production with theo",
  description: "Generated by Ajweb3dev",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <CSPostHogProvider>
        <html lang="en">
          {/* <UploadButton endpoint="imageUploader" /> */}
          <body>{children}</body>
        </html>
      </CSPostHogProvider>
    </ClerkProvider>
  );
}
