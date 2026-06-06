import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Box } from "@mantine/core";
import { useLegalPage } from "@/hooks/use-sanity";
import { PortableText } from "@portabletext/react";
import { legalComponents } from "@/components/shared/portable-text";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "Privacy Policy — Lateefat Tobun" },
      {
        name: "description",
        content:
          "Learn how Lateefat Tobun collects, uses and protects your personal information.",
      },
    ],
  }),
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function PrivacyPage() {
  const { data: page } = useLegalPage("privacy-policy");
  const hasBody = Array.isArray(page?.body) && page.body.length > 0;

  return (
    <Box
      component="article"
      style={{
        background: "var(--bg)",
        color: "var(--fg)",
        paddingTop: "calc(var(--header-h, 80px) + clamp(48px, 7vw, 96px))",
        paddingBottom: "clamp(64px, 10vw, 140px)",
      }}
    >
      <Box
        className="wrap"
        style={{ maxWidth: "760px" }}
      >
        {/* Breadcrumb */}
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "var(--mono)",
            fontSize: "0.68rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--ink-soft)",
            marginBottom: "clamp(28px, 5vw, 52px)",
          }}
        >
          <Link
            to="/"
            style={{
              color: "var(--indigo)",
              textDecoration: "none",
            }}
          >
            Home
          </Link>
          <span aria-hidden="true">—</span>
          <span>Privacy Policy</span>
        </Box>

        {/* Header */}
        <Box style={{ marginBottom: "clamp(32px, 5vw, 56px)" }}>
          <span className="kicker">Legal</span>
          <h1
            className="h-lg"
            style={{ marginTop: "14px", marginBottom: "16px" }}
          >
            {page?.title ?? <>Privacy <em className="accent-ochre">Policy</em></>}
          </h1>
          <p
            style={{
              color: "var(--ink-soft)",
              fontSize: "0.9rem",
              fontFamily: "var(--mono)",
              letterSpacing: "0.04em",
            }}
          >
            Last updated:{" "}
            {page?.lastUpdated ? formatDate(page.lastUpdated) : "June 2026"}
          </p>
        </Box>

        {hasBody ? (
          <PortableText value={page!.body} components={legalComponents} />
        ) : (
          <>
            {/* Intro */}
            <p
              className="lead"
              style={{
                color: "var(--ink-soft)",
                marginBottom: "clamp(28px, 4vw, 48px)",
              }}
            >
              Lateefat Modupeola Tobun ("<strong>we</strong>", "<strong>us</strong>
              ", "<strong>our</strong>") is committed to protecting your privacy.
              This policy explains what personal data we collect when you visit{" "}
              <strong>tobunlateefat.com</strong>, how we use it, and your rights in
              relation to it.
            </p>

            <Divider />

            <Section title="1. Who we are">
              <p>
                The data controller is <strong>Lateefat Modupeola Tobun</strong>,
                based in Bradford, United Kingdom. You can reach us at{" "}
                <a href="mailto:hello@tobunlateefat.com" style={{ color: "var(--indigo)" }}>
                  hello@tobunlateefat.com
                </a>{" "}
                for any privacy-related queries.
              </p>
            </Section>

            <Section title="2. Information we collect">
              <p>We may collect the following categories of personal data:</p>
              <ul>
                <li><strong>Contact enquiries</strong> — your name, email address, telephone number (optional) and message content when you submit the contact form.</li>
                <li><strong>Newsletter sign-ups</strong> — your email address when you opt in to our mailing list via the footer form.</li>
                <li><strong>Usage data</strong> — anonymised browsing analytics (pages visited, session duration, device type) to help us understand how our website is used.</li>
              </ul>
              <p>We do <strong>not</strong> collect payment card data directly; any purchases are handled by a third-party processor whose own privacy notice will apply.</p>
            </Section>

            <Section title="3. How we use your data">
              <p>We use the data we collect to:</p>
              <ul>
                <li>Respond to your enquiry or message.</li>
                <li>Send occasional newsletters about new work, exhibitions and events (only if you opted in — you may unsubscribe at any time).</li>
                <li>Improve our website content based on aggregated, anonymised usage patterns.</li>
                <li>Comply with legal obligations when required.</li>
              </ul>
              <p>Our lawful basis for processing contact enquiries is <em>legitimate interests</em> (responding to your message). For newsletters, our basis is your <em>consent</em>.</p>
            </Section>

            <Section title="4. Cookies & analytics">
              <p>Our site uses a small number of technical cookies necessary for the website to function (e.g. session state). We may also use a privacy-first analytics tool (no cross-site tracking, no advertising profiling) to collect aggregated page-view data.</p>
              <p>You can disable non-essential cookies through your browser settings at any time without affecting your use of the site.</p>
            </Section>

            <Section title="5. Data sharing">
              <p>We do not sell, trade or rent your personal data. We may share data with trusted service providers (e.g. email delivery, hosting) strictly to operate this website — they are contractually bound to handle it securely and only as instructed.</p>
              <p>We may disclose data when required by law or to protect our legal rights.</p>
            </Section>

            <Section title="6. Retention">
              <p>We retain contact enquiry data for up to <strong>24 months</strong> to allow for any follow-up correspondence, then securely delete it. Newsletter subscriber data is retained until you unsubscribe. Anonymised analytics data may be retained indefinitely.</p>
            </Section>

            <Section title="7. Your rights">
              <p>Under UK GDPR and the Data Protection Act 2018, you have the right to:</p>
              <ul>
                <li><strong>Access</strong> the personal data we hold about you.</li>
                <li><strong>Rectify</strong> inaccurate data.</li>
                <li><strong>Erasure</strong> ("right to be forgotten") in certain circumstances.</li>
                <li><strong>Restrict</strong> how we process your data.</li>
                <li><strong>Object</strong> to processing based on legitimate interests.</li>
                <li><strong>Data portability</strong> where processing is automated and consent-based.</li>
              </ul>
              <p>To exercise any of these rights, please email{" "}
                <a href="mailto:hello@tobunlateefat.com" style={{ color: "var(--indigo)" }}>hello@tobunlateefat.com</a>. We will respond within <strong>30 days</strong>.
              </p>
              <p>You also have the right to lodge a complaint with the{" "}
                <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" style={{ color: "var(--indigo)" }}>
                  Information Commissioner's Office (ICO)
                </a>, the UK supervisory authority for data protection.
              </p>
            </Section>

            <Section title="8. Third-party links">
              <p>Our website may include links to third-party websites (e.g. social media). We are not responsible for the privacy practices of those sites and encourage you to read their own policies.</p>
            </Section>

            <Section title="9. Changes to this policy">
              <p>We may update this policy from time to time. The "last updated" date at the top will always reflect the most recent revision. Continued use of the site following any changes constitutes your acceptance of the updated policy.</p>
            </Section>
          </>
        )}

        <Divider />

        <Box
          style={{
            marginTop: "clamp(28px, 4vw, 48px)",
            padding: "clamp(20px, 3vw, 32px)",
            background: "var(--cream-2)",
            borderRadius: "var(--radius)",
            border: "1px solid var(--sand-line)",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "0.96rem",
              color: "var(--ink-soft)",
              lineHeight: 1.6,
            }}
          >
            Questions about this policy?{" "}
            <Link
              to="/contact"
              style={{ color: "var(--indigo)", fontWeight: 600 }}
            >
              Get in touch
            </Link>{" "}
            and we'll be happy to help.
          </p>
        </Box>

        {/* Cross-page navigation */}
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
            marginTop: "clamp(36px, 5vw, 56px)",
          }}
        >
          <Link to="/terms" className="legal-nav-link">
            Terms of Service →
          </Link>
        </Box>
      </Box>

      <style>{`
        article .wrap p {
          margin: 0 0 1.1em;
          color: var(--ink-soft);
          line-height: 1.75;
          font-size: 1.02rem;
        }
        article .wrap ul {
          margin: 0 0 1.1em;
          padding-left: 1.4em;
          color: var(--ink-soft);
          line-height: 1.75;
          font-size: 1.02rem;
        }
        article .wrap ul li {
          margin-bottom: 0.4em;
        }
        article .wrap a:hover {
          text-decoration: underline;
        }
        .prv-section {
          margin-bottom: clamp(28px, 4vw, 44px);
        }
        .prv-section-title {
          font-family: var(--display);
          font-weight: 700;
          font-size: clamp(1.15rem, 2.2vw, 1.4rem);
          letter-spacing: -0.02em;
          color: var(--ink);
          margin: 0 0 14px;
        }
        .prv-divider {
          border: none;
          border-top: 1px solid var(--sand-line);
          margin: clamp(28px, 4vw, 48px) 0;
        }
        .legal-nav-link {
          font-family: var(--mono);
          font-size: 0.78rem;
          letter-spacing: 0.04em;
          color: var(--ink-soft);
          text-decoration: none;
          padding: 9px 18px;
          border: 1px solid var(--sand-line);
          border-radius: 100px;
          transition: border-color 0.2s, color 0.2s;
        }
        .legal-nav-link:hover {
          border-color: var(--indigo);
          color: var(--indigo);
          text-decoration: none !important;
        }
      `}</style>
    </Box>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Box className="prv-section">
      <h2 className="prv-section-title">{title}</h2>
      {children}
    </Box>
  );
}

function Divider() {
  return <hr className="prv-divider" />;
}
