import * as React from "react";
import { Box, Text, Anchor } from "@mantine/core";
import { Instagram, Linkedin, Mail, Sun, Moon } from "lucide-react";

interface MaintenanceViewProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export function MaintenanceView({ theme, toggleTheme }: MaintenanceViewProps) {
  const email = "hello@tobunlateefat.com";
  const instagram = "https://instagram.com/lt_obun";
  const linkedin = "https://linkedin.com/in/lateefat-tobun";
  const twitter = "https://x.com/lt_obun";

  return (
    <Box className="maint-viewport">
      {/* Decorative Blur Orbs */}
      <div className="maint-orb orb-1" aria-hidden="true" />
      <div className="maint-orb orb-2" aria-hidden="true" />

      {/* Main Container */}
      <Box className="maint-content">
        {/* Header Branding */}
        <Box className="maint-header">
          <Box className="maint-brand">
            <Box
              component="span"
              className="maint-avatar-wrapper"
              aria-hidden="true"
            >
              <Box
                component="img"
                src="/assets/img/portrait.png"
                alt="Lateefat Tobun Avatar"
                className="maint-avatar"
              />
            </Box>
            <span className="brand-name">L’ tobun</span>
          </Box>
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? (
              <Moon size={18} strokeWidth={1.5} />
            ) : (
              <Sun size={18} strokeWidth={1.5} />
            )}
          </button>
        </Box>

        {/* Central Card */}
        <Box className="maint-card">
          <Box className="status-badge">
            <span className="pulse-dot" />
            <span className="status-text">Curation in progress · back soon</span>
          </Box>

          <h1 className="maint-title">
            Refining the <br />
            <em className="serif-italic">canvas.</em>
          </h1>

          <Text className="maint-lead">
            Lateefat Art is currently undergoing scheduled maintenance. We are refining the portfolio, exhibitions, and digital couturier experiences to share something beautiful with you soon.
          </Text>

          <Box className="maint-cta">
            <Anchor href={`mailto:${email}`} className="cta-button">
              <Mail size={16} strokeWidth={1.5} /> Get in touch
            </Anchor>
          </Box>
        </Box>

        {/* Footer Connections */}
        <Box className="maint-footer">
          <Text className="footer-label">Connect</Text>
          <Box className="social-row">
            <Anchor
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Instagram"
            >
              <Instagram size={18} strokeWidth={1.3} />
            </Anchor>
            <Anchor
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} strokeWidth={1.3} />
            </Anchor>
            <Anchor
              href={twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Twitter / X"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
              </svg>
            </Anchor>
          </Box>
        </Box>
      </Box>

      {/* Embedded Stylings */}
      <style>{`
        .maint-viewport {
          position: relative;
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg);
          color: var(--fg);
          overflow: hidden;
          padding: 24px;
          box-sizing: border-box;
          transition: background 0.5s var(--ease), color 0.5s var(--ease);
        }

        /* Ambient Orbs */
        .maint-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.15;
          pointer-events: none;
          z-index: 1;
          transition: background 0.5s var(--ease);
        }
        .orb-1 {
          top: 10%;
          left: 15%;
          width: clamp(250px, 40vw, 450px);
          height: clamp(250px, 40vw, 450px);
          background: var(--clay);
          animation: floatOrb1 20s infinite ease-in-out;
        }
        .orb-2 {
          bottom: 10%;
          right: 15%;
          width: clamp(300px, 50vw, 550px);
          height: clamp(300px, 50vw, 550px);
          background: var(--cobalt);
          animation: floatOrb2 25s infinite ease-in-out;
        }

        @keyframes floatOrb1 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(50px, 30px) scale(1.1); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes floatOrb2 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-60px, -40px) scale(1.15); }
          100% { transform: translate(0, 0) scale(1); }
        }

        /* Content Layout */
        .maint-content {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 580px;
          display: flex;
          flex-direction: column;
          min-height: calc(100vh - 48px);
          justify-content: space-between;
          align-items: center;
        }

        /* Header */
        .maint-header {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 12px;
        }
        .maint-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .maint-avatar-wrapper {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          overflow: hidden;
          border: 1px solid var(--line);
          display: grid;
          place-items: center;
          transition: border-color 0.22s var(--ease), transform 0.22s var(--ease);
        }
        .maint-avatar {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .maint-brand:hover .maint-avatar-wrapper {
          border-color: var(--accent);
          transform: scale(1.05);
        }
        .brand-name {
          font-family: var(--display);
          font-weight: 800;
          font-size: 1.4rem;
          letter-spacing: -0.03em;
        }
        .theme-toggle {
          background: none;
          border: 1px solid var(--line);
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          color: var(--fg);
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
        }
        .theme-toggle:hover {
          background: var(--surface);
          border-color: var(--accent);
          transform: scale(1.05);
        }

        /* Central Card */
        .maint-card {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-block: 40px;
        }

        /* Status Badge */
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 16px;
          border-radius: 100px;
          border: 1px solid var(--line);
          background: var(--surface);
          margin-bottom: 28px;
        }
        .pulse-dot {
          width: 7px;
          height: 7px;
          background: var(--clay);
          border-radius: 50%;
          box-shadow: 0 0 0 0 color-mix(in oklab, var(--clay) 40%, transparent);
          animation: pulseGlow 1.8s infinite;
        }
        @keyframes pulseGlow {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 color-mix(in oklab, var(--clay) 70%, transparent); }
          70% { transform: scale(1); box-shadow: 0 0 0 6px color-mix(in oklab, var(--clay) 0%, transparent); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 color-mix(in oklab, var(--clay) 0%, transparent); }
        }
        .status-text {
          font-family: var(--mono);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--fg-soft);
        }

        /* Typography */
        .maint-title {
          font-family: var(--display);
          font-weight: 800;
          font-size: clamp(2.4rem, 7vw, 4.4rem);
          line-height: 1.05;
          letter-spacing: -0.04em;
          margin-bottom: 20px;
          color: var(--fg);
        }
        .serif-italic {
          font-family: var(--serif);
          font-weight: 300;
          font-style: italic;
          color: var(--accent);
        }
        .maint-lead {
          font-family: var(--body);
          font-size: clamp(1rem, 2vw, 1.12rem);
          line-height: 1.6;
          color: var(--fg-soft);
          max-width: 44ch;
          margin-bottom: 36px;
        }

        /* Buttons / CTA */
        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--body);
          font-weight: 600;
          font-size: 0.95rem;
          padding: 14px 28px;
          border-radius: 100px;
          background: var(--accent);
          color: var(--paper);
          transition: background 0.25s, transform 0.2s var(--ease);
          box-shadow: 0 4px 14px color-mix(in oklab, var(--accent) 15%, transparent);
        }
        .cta-button:hover {
          background: var(--accent-deep) !important;
          transform: translateY(-2px);
        }

        /* Footer */
        .maint-footer {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding-bottom: 16px;
        }
        .footer-label {
          font-family: var(--mono);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--fg-soft);
        }
        .social-row {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .social-icon {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid var(--line);
          display: grid;
          place-items: center;
          color: var(--fg-soft);
          transition: background 0.22s var(--ease), color 0.22s, border-color 0.22s, transform 0.22s var(--ease);
        }
        .social-icon:hover {
          background: var(--accent);
          border-color: var(--accent);
          color: var(--paper) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </Box>
  );
}
