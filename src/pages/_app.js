import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import Layout from "@/components/Layout";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/context/AuthContext";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function App({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Layout>
            <Component {...pageProps} />
            <Toaster />
          </Layout>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}