import * as React from "react";
import type { QueryClient } from "@tanstack/react-query";

import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useLocation,
} from "@tanstack/react-router";
import { MantineProvider } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { DefaultCatchBoundary } from "@/components/shared/default-catch-boundary";
import { NotFound } from "@/components/shared/not-found";
import { seo } from "@/utils/seo";

import AOS from "aos";
import theme from "@/theme";
import appCss from "../styles.css?url";

import { ScrollToTop } from "@/components/shared/scroll-to-top";
import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";

import "aos/dist/aos.css";
import { Notifications } from "@mantine/notifications";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title: "Olubukola Art",
        description: `Olubukola Art is a art portfolio website.`,
      }),
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  const location = useLocation();
  const [_, scrollTo] = useWindowScroll();

  React.useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    });
  }, []);

  React.useEffect(() => {
    if (location.hash) return;
    scrollTo({ y: 0 });
  }, [location.pathname, location.hash]);

  React.useEffect(() => {
    requestAnimationFrame(() => {
      AOS.refresh();
    });
  }, [location.pathname, location.hash]);

  return (
    <RootDocument>
      <Outlet />
      <ScrollToTop />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Notifications position='top-right' />
          <section className='relative flex min-h-screen flex-col'>
            <Header />
            <main className='z-10 bg-white sm:shadow-lg'>{children}</main>
            <Footer />
          </section>
          {/* <TanStackRouterDevtools position='bottom-right' /> */}
          {/* <ReactQueryDevtools buttonPosition='bottom-left' /> */}
        </MantineProvider>
        <Scripts />
      </body>
    </html>
  );
}
