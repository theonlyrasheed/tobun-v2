import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Box } from "@mantine/core";
import { useLegalPage } from "@/hooks/use-sanity";
import { PortableText } from "@portabletext/react";
import { legalComponents } from "@/components/shared/portable-text";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: "Terms of Service — Lateefat Tobun" },
      {
        name: "description",
        content:
          "Terms and conditions governing use of the Lateefat Tobun website and services.",
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

function TermsPage() {
  const { data: page } = useLegalPage("terms-of-service");
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
      <Box className="wrap" style={{ maxWidth: "760px" }}>
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
          <Link to="/" style={{ color: "var(--indigo)", textDecoration: "none" }}>
            Home
          </Link>
          <span aria-hidden="true">—</span>
          <span>Terms of Service</span>
        </Box>

        {/* Header */}
        <Box style={{ marginBottom: "clamp(32px, 5vw, 56px)" }}>
          <span className="kicker">Legal</span>
          <h1 className="h-lg" style={{ marginTop: "14px", marginBottom: "16px" }}>
            {page?.title ?? <>Terms of <em className="accent-ochre">Service</em></>}
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
              These terms govern your use of <strong>tobunlateefat.com</strong> (the
              "Site") operated by Lateefat Modupeola Tobun ("we", "us", "our"). By
              accessing the Site you agree to these terms. If you do not agree, please
              do not use the Site.
            </p>

            <Divider />

            <Section title="1. Intellectual property">
              <p>All content on this Site — including artwork, photography, text, illustrations, digital couture, and design — is the exclusive intellectual property of Lateefat Modupeola Tobun unless otherwise stated. Nothing on this Site grants you a licence to reproduce, distribute, modify, or commercially exploit any content without prior written permission.</p>
              <p>You may share links to pages on this Site and reference our work with appropriate attribution.</p>
            </Section>

            <Section title="2. Acceptable use">
              <p>You agree not to:</p>
              <ul>
                <li>Copy, reproduce, or redistribute any artwork or content without written consent.</li>
                <li>Use this Site for any unlawful purpose or in a way that infringes the rights of others.</li>
                <li>Attempt to gain unauthorised access to any part of the Site or its infrastructure.</li>
                <li>Transmit any unsolicited commercial communications via the contact form.</li>
                <li>Scrape or harvest data from this Site by automated means.</li>
              </ul>
            </Section>

            <Section title="3. Commissions & services">
              <p>Enquiries submitted through the contact form do not constitute a binding contract. A commission or service engagement is only confirmed once both parties have agreed the scope, timeline and fee in writing (typically by email or a signed brief).</p>
              <p>Specific terms for commissions, workshops, and licensing will be set out in a separate agreement at the point of engagement. Those terms take precedence over these general terms where they conflict.</p>
            </Section>

            <Section title="4. Third-party links">
              <p>This Site may contain links to external websites (e.g. social media profiles, press coverage, partner organisations). We have no control over their content and accept no responsibility for them. Following such links is at your own risk.</p>
            </Section>

            <Section title="5. Disclaimer of warranties">
              <p>This Site is provided on an "as is" and "as available" basis. We make no warranties — express or implied — regarding availability, accuracy, or fitness for a particular purpose. We do not guarantee uninterrupted or error-free access to the Site.</p>
            </Section>

            <Section title="6. Limitation of liability">
              <p>To the fullest extent permitted by law, Lateefat Modupeola Tobun will not be liable for any indirect, incidental, or consequential loss or damage arising from your use of, or inability to use, this Site or its content.</p>
              <p>Nothing in these terms limits our liability for death, personal injury, or fraud caused by our negligence, or any other liability that cannot be excluded under applicable law.</p>
            </Section>

            <Section title="7. Governing law">
              <p>These terms are governed by the laws of England and Wales. Any dispute arising in connection with these terms will be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
            </Section>

            <Section title="8. Changes to these terms">
              <p>We may update these terms at any time. The "last updated" date at the top will always reflect the most recent revision. Continued use of the Site after any changes constitutes your acceptance of the updated terms.</p>
            </Section>

            <Section title="9. Contact">
              <p>Questions about these terms? Email us at{" "}
                <a href="mailto:hello@tobunlateefat.com" style={{ color: "var(--indigo)" }}>
                  hello@tobunlateefat.com
                </a>{" "}
                and we'll respond within 30 days.
              </p>
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
            Questions about these terms?{" "}
            <Link to="/contact" style={{ color: "var(--indigo)", fontWeight: 600 }}>
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
          <Link to="/privacy" className="legal-nav-link">
            ← Privacy Policy
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
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
