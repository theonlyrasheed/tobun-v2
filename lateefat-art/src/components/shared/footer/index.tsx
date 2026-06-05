import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Box, Text, Anchor } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Instagram, Linkedin, ArrowRight } from "lucide-react";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";

const EXPLORE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/exhibitions", label: "Exhibitions" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/press", label: "Press" },
] as const;

const SOCIAL = [
  {
    href: "#",
    icon: <Instagram size={18} strokeWidth={1.3} />,
    label: "Instagram",
  },
  {
    href: "#",
    icon: <Linkedin size={18} strokeWidth={1.3} />,
    label: "LinkedIn",
  },
] as const;

const schema = z.object({
  email: z.email("Please enter a valid email address"),
});

function ArrowIcon() {
  return (
    <ArrowRight
      size={17}
      strokeWidth={1.8}
      aria-hidden='true'
      style={{
        transition: "transform 0.25s var(--ease)",
      }}
    />
  );
}

export function Footer() {
  const [done, setDone] = React.useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const form = useForm({
    mode: "controlled",
    initialValues: {
      email: "",
    },
    validate: zodResolver(schema),
  });

  const handleSubmit = form.onSubmit((values) => {
    setDone(true);
    form.reset();
  });

  return (
    <Box
      component='footer'
      style={{
        background: "var(--deep)",
        color: "var(--on-dark)",
        paddingBlock: "clamp(56px, 7vw, 96px) 34px",
      }}
    >
      <style>{`
        .footer-link {
          color: color-mix(in oklab, var(--on-dark) 80%, transparent) !important;
          transition: color 0.2s !important;
          text-decoration: none !important;
        }
        .footer-link:hover {
          color: var(--on-dark) !important;
        }
        .footer-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.7em;
          font-family: var(--body);
          font-weight: 600;
          font-size: 1rem;
          padding: 15px 26px;
          border-radius: 100px;
          border: 1px solid transparent;
          cursor: pointer;
          text-decoration: none;
          background: var(--clay-soft);
          color: var(--deep);
          white-space: nowrap;
          transition: transform 0.2s var(--ease), background 0.2s, color 0.2s, border-color 0.2s;
        }
        .footer-cta-btn:hover {
          background: var(--clay-deep) !important;
          transform: translateY(-2px) !important;
        }
        .footer-cta-btn:hover svg {
          transform: translateX(4px) !important;
        }
        .footer-form {
          display: flex;
          align-items: stretch;
          width: 100%;
          max-width: 360px;
          border-radius: 100px;
          overflow: hidden;
          background: color-mix(in oklab, var(--on-dark) 5%, transparent);
          border: 1px solid color-mix(in oklab, var(--on-dark) 26%, transparent);
          transition: border-color 0.25s;
        }
        .footer-form:focus-within {
          border-color: var(--gold) !important;
        }
        .footer-form.form-error {
          border-color: #ff6b6b !important;
        }
        .footer-form-btn {
          flex: none;
          display: grid;
          place-items: center;
          width: 48px;
          border: 0;
          cursor: pointer;
          background: var(--gold);
          color: var(--deep);
          transition: background 0.2s;
        }
        .footer-form-btn:hover {
          background: var(--on-dark) !important;
        }
        .footer-social-link {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          border: 1px solid color-mix(in oklab, var(--on-dark) 26%, transparent);
          color: color-mix(in oklab, var(--on-dark) 82%, transparent);
          transition: background 0.22s var(--ease), color 0.22s, border-color 0.22s, transform 0.22s var(--ease);
          text-decoration: none;
        }
        .footer-social-link:hover {
          border-color: var(--clay) !important;
          background: var(--clay) !important;
          color: var(--on-dark) !important;
          transform: translateY(-2px) !important;
        }
      `}</style>
      <Box
        style={{
          maxWidth: "var(--maxw)",
          margin: "0 auto",
          paddingInline: "var(--gut)",
        }}
      >
        <Box
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.5fr 1fr",
            gap: "clamp(24px, 4vw, 56px)",
            alignItems: "end",
            paddingBottom: "clamp(40px, 5vw, 64px)",
            borderBottom:
              "1px solid color-mix(in oklab, var(--on-dark) 16%, transparent)",
          }}
        >
          <Box
            style={{
              fontFamily: "var(--display)",
              fontWeight: 800,
              fontSize: "clamp(2.4rem, 7vw, 5rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
            }}
          >
            Let’s make
            <br />
            something{" "}
            <em style={{ color: "var(--gold)", fontStyle: "italic" }}>
              unseen.
            </em>
          </Box>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              alignItems: "flex-start",
            }}
          >
            <Text
              component='p'
              style={{
                color: "color-mix(in oklab, var(--on-dark) 72%, transparent)",
                margin: "0 0 22px",
                fontSize: "1.02rem",
                lineHeight: 1.5,
              }}
            >
              Commissions, collaborations, exhibitions and workshops — I’d love
              to hear what you’re imagining.
            </Text>
            <Anchor component={Link} to='/contact' className='footer-cta-btn'>
              Start a conversation <ArrowIcon />
            </Anchor>
          </Box>
        </Box>

        <Box
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.5fr 1fr 1fr",
            gap: "clamp(30px, 4vw, 52px)",
            marginTop: "clamp(40px, 5vw, 64px)",
          }}
        >
          <Box>
            <Text
              component='h4'
              style={{
                fontFamily: "var(--mono)",
                fontWeight: 700,
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gold)",
                margin: "0 0 18px",
              }}
            >
              Stay in touch
            </Text>
            <Text
              component='p'
              style={{
                color: "color-mix(in oklab, var(--on-dark) 70%, transparent)",
                margin: "0 0 18px",
                maxWidth: "32ch",
                lineHeight: 1.5,
              }}
            >
              New work, shows and workshops — a few notes a year, never spam.
            </Text>
            {done ? (
              <Text
                component='p'
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "0.82rem",
                  letterSpacing: "0.04em",
                  color: "var(--gold)",
                  margin: "4px 0 0",
                }}
              >
                Thank you — you’re on the list.
              </Text>
            ) : (
              <>
                <Box
                  component='form'
                  onSubmit={handleSubmit}
                  noValidate
                  className={
                    form.errors.email ? "footer-form form-error" : "footer-form"
                  }
                >
                  <Box
                    component='input'
                    type='email'
                    placeholder='you@email.com'
                    {...form.getInputProps("email")}
                    required
                    aria-label='Email address'
                    style={{
                      flex: 1,
                      minWidth: 0,
                      background: "transparent",
                      border: 0,
                      outline: 0,
                      color: "var(--on-dark)",
                      fontFamily: "var(--body)",
                      fontSize: "0.96rem",
                      padding: "13px 8px 13px 20px",
                    }}
                  />
                  <Box
                    component='button'
                    type='submit'
                    aria-label='Subscribe'
                    className='footer-form-btn'
                  >
                    <ArrowIcon />
                  </Box>
                </Box>
                {form.errors.email && (
                  <Text
                    component='p'
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: "0.72rem",
                      color: "#ff6b6b",
                      margin: "6px 0 0 12px",
                    }}
                  >
                    {form.errors.email}
                  </Text>
                )}
              </>
            )}
          </Box>

          <Box>
            <Text
              component='h4'
              style={{
                fontFamily: "var(--mono)",
                fontWeight: 700,
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gold)",
                margin: "0 0 18px",
              }}
            >
              Explore
            </Text>
            <Box
              component='ul'
              role='list'
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "grid",
                gap: "10px",
              }}
            >
              {EXPLORE_LINKS.map((l) => {
                return (
                  <Box component='li' key={l.href}>
                    <Anchor
                      component={Link}
                      to={l.href}
                      className='footer-link'
                    >
                      {l.label}
                    </Anchor>
                  </Box>
                );
              })}
            </Box>
          </Box>

          <Box>
            <Text
              component='h4'
              style={{
                fontFamily: "var(--mono)",
                fontWeight: 700,
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gold)",
                margin: "0 0 18px",
              }}
            >
              Connect
            </Text>
            <Box
              component='ul'
              role='list'
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "grid",
                gap: "10px",
              }}
            >
              <Box component='li'>
                <Anchor
                  href='mailto:hello@tobunlateefat.com'
                  className='footer-link'
                >
                  hello@tobunlateefat.com
                </Anchor>
              </Box>
              <Box component='li'>
                <Anchor href='tel:+447846002310' className='footer-link'>
                  +44 7846 002310
                </Anchor>
              </Box>
              <Box
                component='li'
                style={{
                  color: "color-mix(in oklab, var(--on-dark) 80%, transparent)",
                  fontSize: "0.96rem",
                }}
              >
                Bradford, United Kingdom
              </Box>
            </Box>
          </Box>
        </Box>

        <Text
          component='p'
          aria-hidden='true'
          style={{
            marginTop: "clamp(48px, 7vw, 96px)",
            fontFamily: "var(--display)",
            fontWeight: 800,
            fontSize: "clamp(4.5rem, 30vw, 22rem)",
            lineHeight: 0.78,
            letterSpacing: "-0.05em",
            textAlign: "center",
            userSelect: "none",
            pointerEvents: "none",
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--on-dark) 96%, transparent), color-mix(in oklab, var(--on-dark) 62%, transparent))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          L’ tobun
        </Text>

        <Box
          style={{
            display: "flex",
            alignItems: isMobile ? "flex-start" : "center",
            justifyContent: "space-between",
            flexDirection: isMobile ? "column" : "row",
            gap: "16px",
            paddingTop: "28px",
            marginTop: "28px",
            borderTop:
              "1px solid color-mix(in oklab, var(--on-dark) 16%, transparent)",
            fontFamily: "var(--mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.03em",
            color: "color-mix(in oklab, var(--on-dark) 52%, transparent)",
          }}
        >
          <Text component='span'>
            &copy; 2026 Lateefat Tobun. All rights reserved.
          </Text>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Box
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              {SOCIAL.map((s, idx) => {
                return (
                  <Anchor
                    key={idx}
                    href={s.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={s.label}
                    className='footer-social-link'
                  >
                    {s.icon}
                  </Anchor>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
