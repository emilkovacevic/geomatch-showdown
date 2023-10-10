import "@/css/globals.css";
import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import LeaderBoard from "@/components/aside/LeaderBoard";
import { ThemeProvider } from "@/components/theme/theme-provider";
import AuthProvider from "@/lib/auth-provider";
import GoogleAnalytics from "@/lib/google-analytics";
import ClientOnly from "@/lib/client-only";
import { Toaster } from "@/components/ui/toaster";

const inter = Noto_Sans({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Geoguessr country capitals",
  description: "Match the country with the capital, be fast, be firts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <AuthProvider>
          <ThemeProvider
            storageKey="website_theme"
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen">
            <Header />
            <div className="container m-2 mx-auto grow">
              {children}
            </div>
            <Footer />
            </div>
            <ClientOnly>
              <Toaster />
            </ClientOnly>
          </ThemeProvider>
        </AuthProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
