import * as React from "react";
import type { QueryClient } from "@tanstack/react-query";
import {
  HeadContent,
  Outlet,
  Scripts,
  ScrollRestoration,
  createRootRouteWithContext,
  useRouterState,
} from "@tanstack/react-router";
import { sanityQ } from "@/sanity/query-builder";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { mantineTheme, cssVariablesResolver } from "@/theme";
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

  return {
    theme,
    toggle: () => setTheme((t) => (t === "light" ? "dark" : "light")),
  };
}

export const ThemeContext = React.createContext<{
  theme: "light" | "dark";
  toggle: () => void;
}>({ theme: "light", toggle: () => {} });

export const Route = createRootRouteWithContext<MyRouterContext>()({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData({
      queryKey: sanityQ.siteSettings.key(),
      queryFn: sanityQ.siteSettings.fetch,
    }),
  head: ({ loaderData }) => {
    const seoTitle = loaderData?.seoTitle || "Lateefat Tobun — Multidisciplinary Artist & Digital Couturier";
    const seoDesc = loaderData?.seoDescription || "Portfolio of Lateefat Modupeola Tobun — multidisciplinary visual artist and digital couturier based in the UK.";

    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          title: seoTitle,
        },
        {
          name: "description",
          content: seoDesc,
        },
        // Open Graph / Facebook Share Metadata
        {
          property: "og:title",
          content: seoTitle,
        },
        {
          property: "og:description",
          content: seoDesc,
        },
        {
          property: "og:image",
          content: "/assets/img/portrait.png",
        },
        {
          property: "og:type",
          content: "website",
        },
        // Twitter Card Metadata
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "twitter:title",
          content: seoTitle,
        },
        {
          name: "twitter:description",
          content: seoDesc,
        },
        {
          name: "twitter:image",
          content: "/assets/img/portrait.png",
        },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/assets/img/portrait.png" },
      { rel: "apple-touch-icon", href: "/assets/img/portrait.png" }
    ],
  };
},
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
      <div
        style={{
          padding: "2rem",
          textAlign: "center",
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <h1 className='h-lg'>404 — Not Found</h1>
        <p className='lead'>The page you are looking for does not exist.</p>
      </div>
    </RootDocument>
  ),
  component: RootComponent,
});

function RootComponent() {
  const routerState = useRouterState();
  const isPending = routerState.status === "pending";

  return (
    <RootDocument>
      {isPending && <div className="top-loader" aria-hidden="true" />}
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
    <html lang='en' data-theme='light'>
      <head>
        <ColorSchemeScript defaultColorScheme='light' />
        <HeadContent />
      </head>
      <body>
        <ThemeContext.Provider value={themeCtx}>
          <MantineProvider theme={mantineTheme} defaultColorScheme='light' cssVariablesResolver={cssVariablesResolver}>
            <Notifications position='top-right' />
            <NavBar />
            <AppShell>
              <main>{children}</main>
            </AppShell>
            <Footer />
            <Cursor />
          </MantineProvider>
        </ThemeContext.Provider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
