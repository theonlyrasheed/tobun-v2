import * as React from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ThemeContext } from "@/routes/__root";
import { Box, Text, Anchor } from "@mantine/core";

const NAV_LINKS = [
  { href: "/gallery", label: "Gallery", idx: "01" },
  { href: "/exhibitions", label: "Exhibitions", idx: "02" },
  { href: "/events", label: "Events", idx: "03" },
  { href: "/about", label: "About", idx: "04" },
  { href: "/press", label: "Press", idx: "05" },
] as const;

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="2" y1="6" x2="20" y2="6"/><line x1="2" y1="12" x2="20" y2="12"/><line x1="2" y1="18" x2="20" y2="18"/>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="4" y1="4" x2="18" y2="18"/><line x1="18" y1="4" x2="4" y2="18"/>
    </svg>
  );
}

export function NavBar() {
  const { theme, toggle } = React.useContext(ThemeContext);
  const [onDark, setOnDark] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const headerRef = React.useRef<HTMLElement>(null);
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  React.useEffect(() => {
    const watched = document.querySelector("[data-header-watch]");
    if (!watched) { setOnDark(false); return; }
    const obs = new IntersectionObserver(
      ([entry]) => setOnDark(entry.isIntersecting),
      { threshold: 0, rootMargin: "-80px 0px 0px 0px" }
    );
    obs.observe(watched);
    return () => obs.disconnect();
  }, [pathname]);

  React.useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      if (headerRef.current) {
        if (y > last && y > 140) headerRef.current.classList.add("nav-hidden");
        else headerRef.current.classList.remove("nav-hidden");
      }
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Box
        component="header"
        ref={headerRef}
        className={`site-header${onDark ? " on-dark" : ""}`}
      >
        <Box
          component="nav"
          className="nav-inner"
          role="navigation"
          aria-label="Main navigation"
        >
          <Anchor
            component={Link}
            to="/"
            className="brand"
            aria-label="Lateefat Tobun — Home"
          >
            <Box component="span" className="b-mark" aria-hidden="true" />
            <Text component="span" className="b-name">
              Lateefat Tobun
            </Text>
          </Anchor>
          <Box component="span" className="nav-div" aria-hidden="true" />
          <Box component="ul" className="nav-links" role="list">
            {NAV_LINKS.map((l) => (
              <Box component="li" key={l.href}>
                <Anchor
                  component={Link}
                  to={l.href}
                  className={pathname.startsWith(l.href) ? "active" : ""}
                >
                  {l.label}
                </Anchor>
              </Box>
            ))}
          </Box>
          <Box component="span" className="nav-div" aria-hidden="true" />
          <Box
            component="button"
            className="theme-toggle"
            onClick={toggle}
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            {theme === "light" ? <SunIcon /> : <MoonIcon />}
          </Box>
          <Anchor component={Link} to="/contact" className="nav-cta">
            Contact
          </Anchor>
          <Box
            component="button"
            className="nav-toggle"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <MenuIcon />
          </Box>
        </Box>
      </Box>

      <Box
        className={`mobile-menu${menuOpen ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <Box className="mm-top">
          <Anchor
            component={Link}
            to="/"
            className="brand"
            onClick={() => setMenuOpen(false)}
            aria-label="Lateefat Tobun — Home"
          >
            <Box component="span" className="b-mark" aria-hidden="true" />
            <Text component="span" className="b-name">
              Lateefat Tobun
            </Text>
          </Anchor>
          <Box
            component="button"
            className="nav-toggle"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            style={{ color: "var(--on-dark)" }}
          >
            <CloseIcon />
          </Box>
        </Box>
        <Box component="ul" className="nav-links" role="list">
          {NAV_LINKS.map((l) => (
            <Box component="li" key={l.href}>
              <Anchor
                component={Link}
                to={l.href}
                onClick={() => setMenuOpen(false)}
              >
                <Box component="span" className="idx" aria-hidden="true">
                  {l.idx}
                </Box>
                <Text component="span">{l.label}</Text>
              </Anchor>
            </Box>
          ))}
          <Box component="li">
            <Anchor
              component={Link}
              to="/contact"
              onClick={() => setMenuOpen(false)}
            >
              <Box component="span" className="idx" aria-hidden="true">
                06
              </Box>
              <Text component="span">Contact</Text>
            </Anchor>
          </Box>
        </Box>
        <Box className="mm-foot">BRADFORD, UK · HELLO@TOBUNLATEEFAT.COM</Box>
      </Box>
    </>
  );
}
