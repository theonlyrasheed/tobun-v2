import * as React from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ThemeContext } from "@/routes/__root";
import { Box } from "@mantine/core";
import { useMediaQuery, useWindowScroll } from "@mantine/hooks";

const NAV_LINKS = [
  { href: "/gallery", label: "Gallery", idx: "01" },
  { href: "/exhibitions", label: "Exhibitions", idx: "02" },
  { href: "/events", label: "Events", idx: "03" },
  { href: "/about", label: "About", idx: "04" },
  { href: "/press", label: "Press", idx: "05" },
] as const;

function SunIcon() {
  return (
    <svg
      width='18'
      height='18'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
    >
      <circle cx='12' cy='12' r='5' />
      <line x1='12' y1='1' x2='12' y2='3' />
      <line x1='12' y1='21' x2='12' y2='23' />
      <line x1='4.22' y1='4.22' x2='5.64' y2='5.64' />
      <line x1='18.36' y1='18.36' x2='19.78' y2='19.78' />
      <line x1='1' y1='12' x2='3' y2='12' />
      <line x1='21' y1='12' x2='23' y2='12' />
      <line x1='4.22' y1='19.78' x2='5.64' y2='18.36' />
      <line x1='18.36' y1='5.64' x2='19.78' y2='4.22' />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width='18'
      height='18'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
    >
      <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      width='22'
      height='22'
      viewBox='0 0 22 22'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      aria-hidden='true'
    >
      <line x1='2' y1='6' x2='20' y2='6' />
      <line x1='2' y1='12' x2='20' y2='12' />
      <line x1='2' y1='18' x2='20' y2='18' />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width='22'
      height='22'
      viewBox='0 0 22 22'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      aria-hidden='true'
    >
      <line x1='4' y1='4' x2='18' y2='18' />
      <line x1='18' y1='4' x2='4' y2='18' />
    </svg>
  );
}

export function NavBar() {
  const { theme, toggle } = React.useContext(ThemeContext);
  const [onDark, setOnDark] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [navHidden, setNavHidden] = React.useState(false);
  const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null);
  const [themeHovered, setThemeHovered] = React.useState(false);
  const [contactHovered, setContactHovered] = React.useState(false);
  const headerRef = React.useRef<HTMLElement>(null);
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const isMobile = useMediaQuery("(max-width: 940px)");
  const [scroll] = useWindowScroll();
  const [lastScrollY, setLastScrollY] = React.useState(0);

  React.useEffect(() => {
    const watched = document.querySelector("[data-header-watch]");
    if (!watched) {
      setOnDark(false);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => setOnDark(entry.isIntersecting),
      { threshold: 0, rootMargin: "-80px 0px 0px 0px" },
    );
    obs.observe(watched);
    return () => obs.disconnect();
  }, [pathname]);

  React.useEffect(() => {
    if (scroll.y > lastScrollY && scroll.y > 140) {
      setNavHidden(true);
    } else {
      setNavHidden(false);
    }
    setLastScrollY(scroll.y);
  }, [scroll.y]);

  return (
    <>
      <Box
        component='header'
        ref={headerRef}
        style={{
          position: "fixed",
          top: isMobile ? "12px" : "16px",
          left: "50%",
          transform: navHidden ? "translate(-50%, -170%)" : "translateX(-50%)",
          zIndex: 100,
          width: "max-content",
          maxWidth: "calc(100vw - 28px)",
          transition:
            "transform 0.55s var(--ease), background 0.3s var(--ease), border-color 0.3s",
        }}
      >
        <Box
          component='nav'
          role='navigation'
          aria-label='Main navigation'
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            padding: "7px 7px 7px 9px",
            borderRadius: "100px",
            background: onDark
              ? "color-mix(in oklab, var(--deep) 55%, transparent)"
              : "color-mix(in oklab, var(--paper) 76%, transparent)",
            backdropFilter: "blur(18px) saturate(1.4)",
            WebkitBackdropFilter: "blur(18px) saturate(1.4)",
            border: onDark
              ? "1px solid color-mix(in oklab, var(--on-dark) 16%, transparent)"
              : "1px solid color-mix(in oklab, var(--fg) 9%, transparent)",
            boxShadow: onDark
              ? "0 12px 34px -16px rgba(20, 18, 30, 0.4)"
              : "0 12px 34px -16px rgba(20, 18, 30, 0.4), inset 0 1px 0 color-mix(in oklab, var(--paper) 60%, transparent)",
            color: onDark ? "var(--on-dark)" : undefined,
            transition:
              "background 0.35s var(--ease), border-color 0.35s, box-shadow 0.35s, color 0.35s",
          }}
        >
          <Box
            component={Link}
            to='/'
            aria-label='Lateefat Tobun — Home'
            style={{
              display: "flex",
              alignItems: "center",
              gap: "9px",
              fontFamily: "var(--display)",
              fontWeight: 700,
              padding: "5px 12px 5px 6px",
              textDecoration: "none",
              color: onDark ? "var(--on-dark)" : "inherit",
            }}
          >
            <Box
              component='span'
              aria-hidden='true'
              style={{
                width: isMobile ? "34px" : "26px",
                height: isMobile ? "34px" : "26px",
                borderRadius: "50%",
                background: "none",
                position: "relative",
                display: "grid",
                placeItems: "center",
                flex: "none",
                overflow: "hidden",
                border: onDark
                  ? "1px solid color-mix(in oklab, var(--on-dark) 24%, transparent)"
                  : "1px solid color-mix(in oklab, var(--fg) 16%, transparent)",
                transition: "width 0.3s var(--ease), height 0.3s var(--ease)",
              }}
            >
              <Box
                component='img'
                src='/assets/img/portrait.png'
                alt='Lateefat Tobun logo'
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
            <Box
              component='span'
              style={{
                fontSize: isMobile ? "1.12rem" : "0.98rem",
                letterSpacing: "-0.03em",
                whiteSpace: "nowrap",
              }}
            >
              Lateefat Tobun
            </Box>
          </Box>
          <Box
            component='span'
            aria-hidden='true'
            style={{
              width: "1px",
              alignSelf: "stretch",
              margin: "6px 4px",
              background: "color-mix(in oklab, currentColor 16%, transparent)",
              display: isMobile ? "none" : undefined,
            }}
          />
          <Box
            component='ul'
            role='list'
            style={{
              display: isMobile ? "none" : "flex",
              alignItems: "center",
              gap: "2px",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {NAV_LINKS.map((l, idx) => {
              const isActive = pathname.startsWith(l.href);
              const isHovered = hoveredIdx === idx;

              const activeBg = onDark
                ? "color-mix(in oklab, var(--on-dark) 14%, transparent)"
                : "color-mix(in oklab, var(--clay) 16%, transparent)";
              const activeColor = onDark ? "var(--on-dark)" : "var(--fg)";
              const baseColor = onDark
                ? "color-mix(in oklab, var(--on-dark) 80%, transparent)"
                : "var(--fg-soft)";

              const hoverBg = onDark
                ? "color-mix(in oklab, var(--on-dark) 12%, transparent)"
                : "color-mix(in oklab, var(--fg) 7%, transparent)";
              const hoverColor = onDark ? "var(--on-dark)" : "var(--fg)";

              return (
                <Box component='li' key={l.href}>
                  <Box
                    component={Link}
                    to={l.href}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      position: "relative",
                      padding: "9px 14px",
                      borderRadius: "100px",
                      color: isActive
                        ? activeColor
                        : isHovered
                          ? hoverColor
                          : baseColor,
                      background: isActive
                        ? activeBg
                        : isHovered
                          ? hoverBg
                          : undefined,
                      textDecoration: "none",
                      transition: "color 0.2s, background 0.2s",
                    }}
                  >
                    {l.label}
                  </Box>
                </Box>
              );
            })}
          </Box>
          <Box
            component='span'
            aria-hidden='true'
            style={{
              width: "1px",
              alignSelf: "stretch",
              margin: "6px 4px",
              background: "color-mix(in oklab, currentColor 16%, transparent)",
              display: isMobile ? "none" : undefined,
            }}
          />
          <Box
            component='button'
            onClick={toggle}
            onMouseEnter={() => setThemeHovered(true)}
            onMouseLeave={() => setThemeHovered(false)}
            aria-label={
              theme === "light" ? "Switch to dark mode" : "Switch to light mode"
            }
            style={{
              display: "grid",
              placeItems: "center",
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              border: 0,
              background: themeHovered
                ? "color-mix(in oklab, currentColor 10%, transparent)"
                : "transparent",
              color: "inherit",
              cursor: "pointer",
              transform: themeHovered ? "rotate(-18deg)" : undefined,
              transition: "transform 0.3s var(--ease), background 0.2s",
            }}
          >
            {theme === "light" ? <SunIcon /> : <MoonIcon />}
          </Box>
          <Box
            component={Link}
            to='/contact'
            onMouseEnter={() => setContactHovered(true)}
            onMouseLeave={() => setContactHovered(false)}
            style={{
              fontFamily: "var(--body)",
              fontWeight: 600,
              fontSize: "0.88rem",
              background: onDark
                ? contactHovered
                  ? "var(--on-dark)"
                  : "var(--gold)"
                : contactHovered
                  ? "var(--clay-deep)"
                  : "var(--clay)",
              color: onDark ? "var(--deep)" : "var(--on-dark)",
              padding: "9px 18px",
              borderRadius: "100px",
              whiteSpace: "nowrap",
              textDecoration: "none",
              display: isMobile ? "none" : undefined,
              transform: contactHovered ? "translateY(-1px)" : undefined,
              transition: "transform 0.2s var(--ease), background 0.2s",
            }}
          >
            Contact
          </Box>
          <Box
            component='button'
            onClick={() => setMenuOpen(true)}
            aria-label='Open menu'
            aria-expanded={menuOpen}
            style={{
              display: isMobile ? "block" : "none",
              background: "none",
              border: 0,
              cursor: "pointer",
              padding: "9px",
              color: "inherit",
              borderRadius: "50%",
            }}
          >
            <MenuIcon />
          </Box>
        </Box>
      </Box>

      <Box
        role='dialog'
        aria-modal='true'
        aria-label='Navigation menu'
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          background: "var(--deep)",
          color: "var(--on-dark)",
          display: "flex",
          flexDirection: "column",
          padding: "28px var(--gut)",
          transform: menuOpen ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.45s var(--ease), visibility 0.45s",
          visibility: menuOpen ? "visible" : "hidden",
        }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            component={Link}
            to='/'
            onClick={() => setMenuOpen(false)}
            aria-label='Lateefat Tobun — Home'
            style={{
              color: "var(--on-dark)",
              display: "flex",
              alignItems: "center",
              gap: "9px",
              fontFamily: "var(--display)",
              fontWeight: 700,
              padding: "5px 12px 5px 6px",
              textDecoration: "none",
            }}
          >
            <Box
              component='span'
              aria-hidden='true'
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "none",
                position: "relative",
                display: "grid",
                placeItems: "center",
                flex: "none",
                overflow: "hidden",
                border:
                  "1px solid color-mix(in oklab, var(--on-dark) 24%, transparent)",
                transition: "width 0.3s var(--ease), height 0.3s var(--ease)",
              }}
            >
              <Box
                component='img'
                src='/assets/img/portrait.png'
                alt='Lateefat Tobun logo'
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
            <Box
              component='span'
              style={{
                fontSize: "1.35rem",
                letterSpacing: "-0.03em",
              }}
            >
              Lateefat Tobun
            </Box>
          </Box>
          <Box
            component='button'
            onClick={() => setMenuOpen(false)}
            aria-label='Close menu'
            style={{
              color: "var(--on-dark)",
              display: "block",
              background: "none",
              border: 0,
              cursor: "pointer",
              padding: "9px",
              borderRadius: "50%",
            }}
          >
            <CloseIcon />
          </Box>
        </Box>
        <Box
          component='nav'
          aria-label='Mobile'
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "4px",
            marginTop: "8vh",
          }}
        >
          {NAV_LINKS.map((l, i) => (
            <Box
              component={Link}
              key={l.href}
              to={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--display)",
                fontWeight: 700,
                fontSize: "clamp(2rem, 9vw, 3.4rem)",
                color: "var(--on-dark)",
                padding: "8px 0",
                textDecoration: "none",
              }}
            >
              <Box
                component='span'
                aria-hidden='true'
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "0.8rem",
                  color: "var(--ochre)",
                  verticalAlign: "super",
                  marginRight: "10px",
                }}
              >
                0{i + 1}
              </Box>
              <span>{l.label}</span>
            </Box>
          ))}
          <Box
            component={Link}
            to='/contact'
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "var(--display)",
              fontWeight: 700,
              fontSize: "clamp(2rem, 9vw, 3.4rem)",
              color: "var(--on-dark)",
              padding: "8px 0",
              textDecoration: "none",
            }}
          >
            <Box
              component='span'
              aria-hidden='true'
              style={{
                fontFamily: "var(--mono)",
                fontSize: "0.8rem",
                color: "var(--ochre)",
                verticalAlign: "super",
                marginRight: "10px",
              }}
            >
              06
            </Box>
            <span>Contact</span>
          </Box>
        </Box>
        <Box
          style={{
            marginTop: "auto",
            fontFamily: "var(--mono)",
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
            color: "color-mix(in oklab, var(--on-dark) 60%, transparent)",
          }}
        >
          BRADFORD, UK · HELLO@TOBUNLATEEFAT.COM
        </Box>
      </Box>
    </>
  );
}
