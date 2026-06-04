import * as React from "react";
import type { QueryClient } from "@tanstack/react-query";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { MantineProvider } from "@mantine/core";
import { mantineTheme } from "@/theme";
import appCss from "@/styles/index.css?url";
import { Notifications } from "@mantine/notifications";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lateefat Art", description: "Lateefat Art Portfolio Website" },
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
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>404 - Not Found</h1>
        <p>The page you are looking for does not exist.</p>
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

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <HeadContent />
      </head>
      <body>
        <MantineProvider theme={mantineTheme}>
          <Notifications position='top-right' />
          <main className='min-h-screen'>{children}</main>
        </MantineProvider>
        <Scripts />
      </body>
    </html>
  );
}
