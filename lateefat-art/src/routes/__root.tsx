import * as React from "react";
import type { QueryClient } from "@tanstack/react-query";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { mantineTheme } from "@/theme";
import appCss from "@/styles/index.css?url";
import { NavBar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Cursor } from "@/components/shared/cursor";
import { useReveal } from "@/components/shared/reveal";

interface MyRouterContext {
  queryClient: QueryClient;
}

function useTheme() {
  const [theme, setTheme] = React.useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    return (localStorage.getItem("lt_theme") as "light" | "dark") || "light";
  });

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.mantineColorScheme = theme;
    localStorage.setItem("lt_theme", theme);
  }, [theme]);

  return { theme, toggle: () => setTheme((t) => (t === "light" ? "dark" : "light")) };
}

export const ThemeContext = React.createContext<{
  theme: "light" | "dark";
  toggle: () => void;
}>({ theme: "light", toggle: () => {} });

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lateefat Tobun — Multidisciplinary Artist & Digital Couturier" },
      { name: "description", content: "Portfolio of Lateefat Modupeola Tobun — multidisciplinary visual artist and digital couturier based in the UK." },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  errorComponent: ({ error }) => (
    <RootDocument>
      <div style={{ padding: "2rem" }}>
        <h1>Something went wrong</h1>
        <pre>{(error as Error).message}</pre>
      </div>
    </RootDocument>
  ),
  notFoundComponent: () => (
    <RootDocument>
      <div style={{ padding: "2rem", textAlign: "center", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
        <h1 className="h-lg">404 — Not Found</h1>
        <p className="lead">The page you are looking for does not exist.</p>
      </div>
    </RootDocument>
  ),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function AppShell({ children }: { children: React.ReactNode }) {
  useReveal();
  return <>{children}</>;
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const themeCtx = useTheme();

  return (
    <html lang="en" data-theme="light">
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
        <HeadContent />
      </head>
      <body>
        <ThemeContext.Provider value={themeCtx}>
          <MantineProvider theme={mantineTheme} defaultColorScheme="light">
            <Notifications position="top-right" />
            <NavBar />
            <AppShell>
              <main>{children}</main>
            </AppShell>
            <Footer />
            <Cursor />
          </MantineProvider>
        </ThemeContext.Provider>
        <Scripts />
      </body>
    </html>
  );
}
