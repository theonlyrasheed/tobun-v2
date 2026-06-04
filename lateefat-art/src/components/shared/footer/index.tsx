import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Box, Text, Anchor } from "@mantine/core";

const EXPLORE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/exhibitions", label: "Exhibitions" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/press", label: "Press" },
] as const;

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.3-.02-2.96-1.8-2.96-1.8 0-2.08 1.4-2.08 2.86V21h-4z"/>
    </svg>
  );
}

function BehanceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8.2 6.5c.9 0 1.6.1 2.2.3.6.2 1 .5 1.4.8.3.3.6.7.7 1.2.2.5.2 1 .2 1.6 0 .7-.15 1.25-.5 1.7-.3.45-.8.8-1.4 1.1.85.25 1.5.7 1.9 1.3.4.6.6 1.35.6 2.2 0 .7-.13 1.3-.4 1.8-.27.5-.63.95-1.1 1.3-.45.32-.98.56-1.6.72-.6.16-1.24.24-1.9.24H2V6.5h6.2zM5 10.6h2.7c.5 0 .9-.12 1.2-.36.3-.24.45-.6.45-1.1 0-.27-.05-.5-.15-.68a1.1 1.1 0 0 0-.4-.43 1.7 1.7 0 0 0-.6-.22 3.7 3.7 0 0 0-.72-.06H5v2.85zM5 15.9h2.9c.3 0 .56-.03.8-.1.24-.06.45-.16.62-.3.17-.14.3-.32.4-.54.1-.22.14-.49.14-.8 0-.62-.17-1.06-.52-1.33-.35-.27-.8-.4-1.38-.4H5v3.47zM15.8 15.55c.25.24.6.36 1.07.36.33 0 .62-.08.86-.25.24-.16.4-.34.45-.52h1.95c-.3 1-.8 1.7-1.45 2.13-.65.42-1.44.63-2.37.63-.65 0-1.23-.1-1.75-.3a3.6 3.6 0 0 1-1.3-.87 3.9 3.9 0 0 1-.82-1.35 5.1 5.1 0 0 1-.28-1.73c0-.6.1-1.17.3-1.7.2-.52.48-.97.85-1.35.37-.38.8-.68 1.3-.9.5-.2 1.06-.32 1.67-.32.68 0 1.27.13 1.78.4.5.26.92.62 1.24 1.07.32.45.55.96.68 1.54.04.27.07.55.06.85h-5.6c0 .65.13 1.13.4 1.4zM17.6 7.7h-3.6V6.4h3.6v1.3zm-1.05 4.05a1.36 1.36 0 0 0-.95-.36c-.32 0-.58.06-.78.17-.2.1-.37.24-.5.4a1.4 1.4 0 0 0-.26.5c-.05.17-.08.32-.1.46h3.2c-.05-.5-.22-.88-.5-1.17z"/>
    </svg>
  );
}

const SOCIAL = [
  { href: "#", icon: <InstagramIcon />, label: "Instagram" },
  { href: "#", icon: <LinkedinIcon />, label: "LinkedIn" },
  { href: "#", icon: <BehanceIcon />, label: "Behance" },
] as const;

function ArrowIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M3 8.5h11M9 3.5l5 5-5 5"/>
    </svg>
  );
}

export function Footer() {
  const [email, setEmail] = React.useState("");
  const [done, setDone] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
    setEmail("");
  };

  return (
    <Box component="footer" className="site-footer">
      <Box className="wrap">
        <Box className="footer-cta">
          <Box className="footer-big">
            Let’s make
            <br />
            something <em className="accent-ochre">unseen.</em>
          </Box>
          <Box className="footer-cta-side">
            <Text component="p">
              Commissions, collaborations, exhibitions and workshops — I’d love to hear what you’re imagining.
            </Text>
            <Anchor component={Link} to="/contact" className="btn btn-ochre">
              Start a conversation <ArrowIcon />
            </Anchor>
          </Box>
        </Box>

        <Box className="footer-grid">
          <Box className="footer-news">
            <Text component="h4">Stay in touch</Text>
            <Text component="p" className="fn-copy">
              New work, shows and workshops — a few notes a year, never spam.
            </Text>
            {done ? (
              <Text component="p" className="news-done">
                Thank you — you’re on the list.
              </Text>
            ) : (
              <Box
                component="form"
                className="news-form"
                onSubmit={handleSubmit}
                noValidate
              >
                <Box
                  component="input"
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  required
                  aria-label="Email address"
                />
                <Box component="button" type="submit" aria-label="Subscribe">
                  <ArrowIcon />
                </Box>
              </Box>
            )}
          </Box>

          <Box className="footer-col">
            <Text component="h4">Explore</Text>
            <Box component="ul" role="list">
              {EXPLORE_LINKS.map((l) => (
                <Box component="li" key={l.href}>
                  <Anchor component={Link} to={l.href}>
                    {l.label}
                  </Anchor>
                </Box>
              ))}
            </Box>
          </Box>

          <Box className="footer-col">
            <Text component="h4">Connect</Text>
            <Box component="ul" role="list">
              <Box component="li">
                <Anchor href="mailto:hello@tobunlateefat.com">hello@tobunlateefat.com</Anchor>
              </Box>
              <Box component="li">
                <Anchor href="tel:+447846002310">+44 7846 002310</Anchor>
              </Box>
              <Box
                component="li"
                style={{ color: "color-mix(in oklab, var(--on-dark) 80%, transparent)" }}
              >
                Bradford, United Kingdom
              </Box>
            </Box>
          </Box>
        </Box>

        <Text component="p" className="footer-wordmark" aria-hidden="true">
          L’ tobun
        </Text>

        <Box className="footer-bottom">
          <Text component="span">&copy; 2026 Lateefat Tobun. All rights reserved.</Text>
          <Box className="footer-end-right">
            <Text component="span" className="fe-handle">
              @lateefatart
            </Text>
            <Box className="footer-social">
              {SOCIAL.map((s, idx) => (
                <Anchor
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                >
                  {s.icon}
                </Anchor>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
