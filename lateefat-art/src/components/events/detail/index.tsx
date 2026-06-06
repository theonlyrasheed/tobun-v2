import * as React from "react";
import { Link } from "@tanstack/react-router";
import type { SiteEvent, EventStatus } from "@/types/sanity";
import { PortableText } from "@portabletext/react";
import { legalComponents } from "@/components/shared/portable-text";

/* ── Status badge ────────────────────────────────────────────── */
const STATUS_CONFIG: Record<
  EventStatus,
  { label: string; color: string; bg: string }
> = {
  upcoming: { label: "Upcoming", color: "var(--on-dark)", bg: "var(--clay)" },
  ongoing: { label: "Ongoing", color: "#fff", bg: "#2da44e" },
  expired: { label: "Past event", color: "#fff", bg: "#bc382e" },
};

function StatusBadge({ status }: { status: EventStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        padding: "4px 12px",
        borderRadius: "100px",
        fontFamily: "var(--mono)",
        fontSize: "0.62rem",
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        background: cfg.bg,
        color: cfg.color,
      }}
    >
      {status === "ongoing" && (
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#fff",
            animation: "ev-pulse 1.4s ease-in-out infinite",
            flexShrink: 0,
          }}
        />
      )}
      {cfg.label}
    </span>
  );
}

/* ── Luma checkout button ────────────────────────────────────── */
/**
 * Luma's checkout script scans the DOM on load.
 * Because React renders *after* script injection we must call
 * window.luma.initCheckout() once the button is in the DOM.
 *
 * Per Luma docs the script tag id must be exactly "luma-checkout"
 * and data-luma-event-id must be the evt-XXXXX segment.
 *
 * Supported URL formats:
 *   https://luma.com/event/evt-wRomNbQSv9vhcOG  →  evt-wRomNbQSv9vhcOG  ✓ preferred
 *   https://lu.ma/event/evt-wRomNbQSv9vhcOG     →  evt-wRomNbQSv9vhcOG  ✓
 *   https://luma.com/e6g9a3x5                   →  e6g9a3x5 (slug fallback)
 */
function extractLumaId(url: string): string {
  const clean = url.split(/[?#]/)[0].replace(/\/$/, "")
  // Prefer the evt-XXXXX segment if present
  const evtMatch = clean.match(/\/(evt-[A-Za-z0-9]+)/)
  if (evtMatch) return evtMatch[1]
  // Fallback: last path segment (slug-based URLs)
  return clean.split("/").pop() ?? ""
}

function LumaCheckout({ url }: { url: string }) {
  const eventId = extractLumaId(url)

  React.useEffect(() => {
    function init() {
      const w = window as any
      w.luma?.initCheckout?.()
    }

    const existing = document.getElementById("luma-checkout")
    if (existing) {
      init()
    } else {
      const script = document.createElement("script")
      script.id = "luma-checkout"
      script.src = "https://embed.lu.ma/checkout-button.js"
      script.async = true
      script.onload = init
      document.head.appendChild(script)
    }
  }, [url])

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <p className="ev-booking-note">
        RSVP via Luma — you'll get an instant confirmation and reminders before the event.
      </p>
      <a
        href={url}
        className="luma-checkout--button btn btn-ochre"
        data-luma-action="checkout"
        data-luma-event-id={eventId}
        style={{ alignSelf: "flex-start", textDecoration: "none" }}
      >
        Register now
      </a>
    </div>
  )
}

/* ── Booking embed ───────────────────────────────────────────── */
function BookingEmbed({
  bookingUrl,
  title,
  status,
}: {
  bookingUrl: string;
  title: string;
  status: EventStatus;
}) {
  // Match both lu.ma (short domain) and luma.com (full domain)
  const isLuma = /lu\.ma|luma\.com/.test(bookingUrl);
  const isCalCom = bookingUrl.includes("cal.com");
  const isCalendly = bookingUrl.includes("calendly.com");
  const isExternal = bookingUrl.startsWith("http");
  const isDisabled = status === "expired";

  if (isDisabled) {
    return (
      <div className='ev-booking-closed'>
        <p>Registrations for this event are now closed.</p>
        <Link to='/events' className='link-arrow' style={{ marginTop: "12px" }}>
          View upcoming events
        </Link>
      </div>
    );
  }

  if (isLuma) {
    return (
      <div className='ev-booking-embed'>
        <LumaCheckout url={bookingUrl} />
      </div>
    );
  }

  if (isCalCom) {
    return (
      <div className='ev-booking-embed'>
        <p className='ev-booking-note'>
          Book your place via Cal.com — select a time that works for you.
        </p>
        <iframe
          src={`${bookingUrl}?embed=true`}
          style={{
            width: "100%",
            minHeight: "620px",
            border: 0,
            borderRadius: "var(--radius)",
          }}
          title={`Book — ${title}`}
          loading='lazy'
        />
      </div>
    );
  }

  if (isCalendly) {
    return (
      <div className='ev-booking-embed'>
        <p className='ev-booking-note'>Reserve your spot via Calendly.</p>
        <iframe
          src={`${bookingUrl}?embed_domain=lateefat.art&embed_type=Inline&hide_gdpr_banner=1`}
          style={{
            width: "100%",
            minHeight: "660px",
            border: 0,
            borderRadius: "var(--radius)",
          }}
          title={`Book — ${title}`}
          loading='lazy'
        />
      </div>
    );
  }

  // Generic external URL — prominent CTA button
  return (
    <div className='ev-booking-cta'>
      <p className='ev-booking-note'>
        Ready to join? Click below to complete your registration.
      </p>
      <a
        href={isExternal ? bookingUrl : `https://${bookingUrl}`}
        target='_blank'
        rel='noopener noreferrer'
        className='btn btn-ochre'
        style={{ alignSelf: "flex-start" }}
      >
        Register now
        <svg
          width='17'
          height='17'
          viewBox='0 0 17 17'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.8'
        >
          <path d='M3 8.5h11M9 3.5l5 5-5 5' />
        </svg>
      </a>
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────── */
interface EventDetailProps {
  event: SiteEvent;
}

export function EventDetail({ event }: EventDetailProps) {
  const bookingUrl = event.bookingUrl || event.href;
  const hasBooking =
    bookingUrl && bookingUrl !== "/contact" && bookingUrl !== "#";
  const isExpired = event.status === "expired";

  return (
    <>
      {/* ── Hero ── */}
      <section
        className='ev-detail-hero'
        style={{
          position: "relative",
          minHeight: "clamp(420px, 62vh, 680px)",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          padding:
            "calc(var(--header-h) + 40px) var(--gut) clamp(40px, 6vh, 80px)",
          color: "var(--on-dark)",
          background: "var(--deep)",
        }}
      >
        {/* background image (blurred backdrop for ambience) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          <img
            src={event.img}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "blur(32px) brightness(0.35)",
              opacity: 0.45,
              transform: "scale(1.1)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 70% 30%, rgba(197, 137, 64, 0.15), transparent 60%)",
            }}
          />
        </div>

        <div
          className="wrap ev-hero-grid"
          style={{
            position: "relative",
            zIndex: 2,
          }}
        >
          <div className='ev-hero-content'>
            {/* Back */}
            <Link
              to='/events'
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: "var(--mono)",
                fontSize: "0.62rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
                marginBottom: "24px",
                textDecoration: "none",
              }}
            >
              <svg
                width='13'
                height='13'
                viewBox='0 0 13 13'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.8'
              >
                <path d='M10 6.5H3M6.5 3L3 6.5l3.5 3.5' />
              </svg>
              All events
            </Link>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "14px",
              }}
            >
              <StatusBadge status={event.status} />
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                {event.badge}
              </span>
            </div>

            <h1
              className='h-xl'
              style={{
                color: "var(--on-dark)",
                margin: "0 0 18px",
                maxWidth: "22ch",
                lineHeight: 1.1,
              }}
            >
              {event.title}
            </h1>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "18px",
                color: "rgba(255,255,255,0.72)",
                fontFamily: "var(--mono)",
                fontSize: "0.68rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              <span>📅 {event.date}</span>
              {event.location && <span>📍 {event.location}</span>}
            </div>
          </div>

          <div className='ev-hero-media'>
            <img
              src={event.img}
              alt={event.title}
              className='ev-hero-flyer'
              style={{
                filter: isExpired ? "grayscale(40%)" : undefined,
              }}
            />
          </div>
        </div>
      </section>

      {/* ── Body + Booking ── */}
      <section
        style={{
          background: "var(--bg)",
          padding: "clamp(40px, 7vh, 96px) var(--gut)",
        }}
      >
        <div className='wrap ev-detail-body'>
          {/* Left — description */}
          <div>
            <p
              style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(1.05rem, 1.6vw, 1.3rem)",
                lineHeight: 1.7,
                color: "var(--fg)",
                marginBottom: "clamp(20px, 3vh, 36px)",
                textWrap: "pretty",
              }}
            >
              {event.desc}
            </p>

            {/* Rich text body rendered via shared PortableText if present */}
            {event.body && event.body.length > 0 && (
              <div
                className='prose'
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.75,
                  color: "var(--fg-soft)",
                  marginTop: "24px",
                }}
              >
                <PortableText value={event.body} components={legalComponents} />
              </div>
            )}

            {/* Date / location detail */}
            <dl
              style={{
                marginTop: "clamp(24px, 3vh, 40px)",
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: "10px 20px",
                fontSize: "0.88rem",
                color: "var(--fg-soft)",
              }}
            >
              <dt
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  paddingTop: "2px",
                }}
              >
                Date
              </dt>
              <dd style={{ margin: 0 }}>{event.date}</dd>

              {event.location && (
                <>
                  <dt
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: "0.62rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      paddingTop: "2px",
                    }}
                  >
                    Location
                  </dt>
                  <dd style={{ margin: 0 }}>{event.location}</dd>
                </>
              )}

              <dt
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  paddingTop: "2px",
                }}
              >
                Admission
              </dt>
              <dd style={{ margin: 0 }}>{event.badge}</dd>

              <dt
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  paddingTop: "2px",
                }}
              >
                Status
              </dt>
              <dd style={{ margin: 0 }}>
                <StatusBadge status={event.status} />
              </dd>
            </dl>
          </div>

          {/* Right — booking */}
          <div
            className='ev-booking-sidebar'
            style={{
              background: "var(--surface)",
              border: "1px solid var(--sand-line)",
              borderRadius: "calc(var(--radius) * 1.4)",
              padding: "clamp(24px, 3vw, 40px)",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--display)",
                fontSize: "1.4rem",
                fontWeight: 700,
                color: "var(--fg)",
                margin: "0 0 6px",
              }}
            >
              {isExpired ? "Event has ended" : "Reserve your spot"}
            </h2>
            <p
              style={{
                fontFamily: "var(--sans, sans-serif)",
                fontSize: "0.875rem",
                color: "var(--fg-soft)",
                margin: "0 0 24px",
                lineHeight: 1.55,
              }}
            >
              {isExpired
                ? "This event has passed. Check back for future events."
                : `Secure your place for ${event.title}. ${event.badge === "Free" ? "Attendance is free." : ""}`}
            </p>

            {hasBooking ? (
              <BookingEmbed
                bookingUrl={bookingUrl}
                title={event.title}
                status={event.status}
              />
            ) : (
              <div>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--fg-soft)",
                    marginBottom: "16px",
                  }}
                >
                  Interested in attending? Get in touch and we'll confirm your
                  registration.
                </p>
                <Link
                  to='/contact'
                  className='btn btn-ochre'
                  style={{ display: "inline-flex" }}
                >
                  Enquire about this event
                  <svg
                    width='17'
                    height='17'
                    viewBox='0 0 17 17'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1.8'
                  >
                    <path d='M3 8.5h11M9 3.5l5 5-5 5' />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes ev-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.7); }
        }
        .ev-booking-note {
          font-size: 0.82rem;
          color: var(--fg-soft);
          margin-bottom: 16px;
          line-height: 1.5;
        }
        .ev-booking-closed {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 20px;
          background: color-mix(in oklab, var(--sand-line) 30%, transparent);
          border-radius: var(--radius);
          font-size: 0.875rem;
          color: var(--fg-soft);
        }
        .ev-booking-embed iframe,
        .ev-booking-cta {
          width: 100%;
        }
        .ev-booking-cta {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        
        /* Hero Grid */
        .ev-hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: center;
          width: 100%;
        }
        .ev-hero-content {
          width: 100%;
        }
        .ev-hero-media {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }
        .ev-hero-flyer {
          width: 100%;
          max-width: 300px;
          height: auto;
          max-height: 380px;
          object-fit: contain;
          border-radius: var(--radius);
          box-shadow: 
            0 16px 36px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.15);
          transition: transform 0.4s var(--ease), box-shadow 0.4s var(--ease);
        }
        .ev-hero-flyer:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 
            0 24px 48px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.15);
        }

        /* Body grid */
        .ev-detail-body {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: start;
        }
        
        @media (min-width: 1024px) {
          .ev-hero-grid {
            grid-template-columns: 1.25fr 0.75fr;
            gap: 64px;
          }
          .ev-hero-media {
            justify-content: flex-end;
          }
          .ev-hero-flyer {
            max-width: 380px;
            max-height: 480px;
          }
          .ev-detail-body {
            grid-template-columns: 1fr min(480px, 42%);
            gap: clamp(32px, 5vw, 80px);
          }
          .ev-booking-sidebar {
            position: sticky;
            top: calc(var(--header-h) + 24px);
          }
        }

        /* Luma checkout button style overrides to match our btn-ochre styling */
        .luma-checkout--button {
          background: var(--clay-soft) !important;
          color: var(--deep) !important;
          font-family: var(--body) !important;
          font-weight: 600 !important;
          padding: 15px 26px !important;
          border-radius: 100px !important;
          font-size: 1rem !important;
          box-shadow: none !important;
          border: 1px solid transparent !important;
          display: inline-flex !important;
          align-items: center !important;
          gap: 0.7em !important;
          text-decoration: none !important;
          transition: transform 0.2s var(--ease), background 0.2s !important;
        }
        .luma-checkout--button:hover {
          background: var(--clay-deep) !important;
          transform: translateY(-2px) !important;
        }
      `}</style>
    </>
  );
}
