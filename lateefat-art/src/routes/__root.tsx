import * as React from "react";
import type { QueryClient } from "@tanstack/react-query";
import {
  HeadContent,
  Outlet,
  Scripts,
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
import { FavIcon } from "@/components/shared/favicon";
import { MaintenanceView } from "@/components/shared/maintenance";

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
  loader: async ({ context: { queryClient } }) => {
    let isDev = false;
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      isDev = hostname === "dev.tobunlateefat.com" || hostname.endsWith(".dev.tobunlateefat.com");
    } else {
      try {
        const serverModule = "@tanstack/react-start/server";
        const { getRequestHeaders } = await import(serverModule);
        const headers = getRequestHeaders() as Record<string, string | string[] | undefined>;
        const forwardedHost = headers["x-forwarded-host"];
        const hostHeader = headers["host"];
        const rawHost = forwardedHost || hostHeader;
        const host = Array.isArray(rawHost) ? rawHost[0] : rawHost;
        const cleanHost = host ? host.split(":")[0] : "";
        isDev = cleanHost === "dev.tobunlateefat.com" || cleanHost.endsWith(".dev.tobunlateefat.com");
      } catch (e) {
        console.error("Failed to check server host", e);
      }
    }

    if (isDev) {
      const settings = await queryClient
        .ensureQueryData({
          queryKey: sanityQ.siteSettings.key(),
          queryFn: sanityQ.siteSettings.fetch,
        })
        .catch(() => null);
      return { settings, isDev };
    }

    if (import.meta.env.VITE_MAINTENANCE_MODE === "true") {
      return { settings: null, isDev };
    }
    const settings = await queryClient
      .ensureQueryData({
        queryKey: sanityQ.siteSettings.key(),
        queryFn: sanityQ.siteSettings.fetch,
      })
      .catch(() => null);
    return { settings, isDev };
  },
  head: ({ loaderData }) => {
    const seoTitle = loaderData?.settings?.seoTitle || "Lateefat Tobun — Multidisciplinary Artist & Digital Couturier";
    const seoDesc = loaderData?.settings?.seoDescription || "Portfolio of Lateefat Modupeola Tobun — multidisciplinary visual artist and digital couturier based in the UK.";

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
  const loaderData = Route.useLoaderData();
  const isMaintenance =
    !loaderData?.isDev &&
    (import.meta.env.VITE_MAINTENANCE_MODE === "true" ||
      loaderData?.settings?.maintenanceMode === true);

  return (
    <html lang='en' data-theme='light'>
      <head>
        <ColorSchemeScript defaultColorScheme='light' />
        <FavIcon />
        <HeadContent />
      </head>
      <body>
        <ThemeContext.Provider value={themeCtx}>
          <MantineProvider theme={mantineTheme} defaultColorScheme='light' cssVariablesResolver={cssVariablesResolver}>
            <Notifications position='top-right' />
            {isMaintenance ? (
              <MaintenanceView theme={themeCtx.theme} toggleTheme={themeCtx.toggle} />
            ) : (
              <>
                <NavBar />
                <AppShell>
                  <main>{children}</main>
                </AppShell>
                <Footer />
                <Cursor />
              </>
            )}
          </MantineProvider>
        </ThemeContext.Provider>
        <Scripts />
      </body>
    </html>
  );
}
