import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Box, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSiteSettings } from "@/hooks/use-sanity";
import { sendContactEmail } from "@/utils/send-contact";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

interface ContactFormValues {
  name: string;
  tel: string;
  email: string;
  subject: string;
  msg: string;
}

function ContactPage() {
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const { data: settings } = useSiteSettings();

  const email = settings?.email ?? "hello@tobunlateefat.com";
  const phone = settings?.phone ?? "+44 7846 002310";
  const location = settings?.location ?? "Bradford, United Kingdom";

  const form = useForm<ContactFormValues>({
    initialValues: {
      name: "",
      tel: "",
      email: "",
      subject: "",
      msg: "",
    },
    validate: {
      name: (val) => (val.trim().length > 0 ? null : "Name is required"),
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email address"),
      msg: (val) => (val.trim().length > 0 ? null : "Message is required"),
    },
  });

  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = async (values: ContactFormValues) => {
    setLoading(true);
    setErrorMsg(null);
    setSubmitted(false);

    try {
      const res = await sendContactEmail({ data: values });
      if (res.success) {
        setSubmitted(true);
        form.reset();
        
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          setSubmitted(false);
        }, 7000); // Auto close after 7 seconds
      } else {
        setErrorMsg(res.error || "Failed to send email. Please try again.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component='section'
      className='section wrap'
      style={{
        background: "var(--bg)",
        color: "var(--fg)",
        paddingBottom: "clamp(48px, 7vw, 110px)",
      }}
    >
      <Box className='ct-wrap'>
        {/* Contact Info Column */}
        <Box className='ct-hero' data-screen-label='Contact'>
          <span className='kicker'>Contact</span>
          <h1 className='display' style={{ margin: "18px 0 22px" }}>
            Say <em className='accent-ochre'>hello.</em>
          </h1>
          <p
            className='lead'
            style={{ maxWidth: "40ch", color: "var(--ink-soft)" }}
          >
            Stay connected and explore creative opportunities with Lateefat Art
            — commissions, collaborations, exhibitions or media. Every
            conversation begins with a simple hello.
          </p>
          <Box className='ct-info' style={{ marginTop: "36px" }}>
            <Box
              className='row'
              style={{
                display: "flex",
                gap: "18px",
                alignItems: "flex-start",
                padding: "20px 0",
                borderTop: "1px solid var(--sand-line)",
              }}
            >
              <span
                className='k'
                style={{
                  minWidth: "96px",
                  fontWeight: 700,
                  fontFamily: "var(--mono)",
                  fontSize: "0.68rem",
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color: "var(--indigo-bright)",
                }}
              >
                Studio
              </span>
              <span
                className='v'
                style={{
                  fontWeight: 600,
                  fontFamily: "var(--display)",
                  fontSize: "clamp(1.1rem,1.8vw,1.4rem)",
                }}
              >
                {location}
              </span>
            </Box>
            <Box
              className='row'
              style={{
                display: "flex",
                gap: "18px",
                alignItems: "flex-start",
                padding: "20px 0",
                borderTop: "1px solid var(--sand-line)",
              }}
            >
              <span
                className='k'
                style={{
                  minWidth: "96px",
                  fontWeight: 700,
                  fontFamily: "var(--mono)",
                  fontSize: "0.68rem",
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color: "var(--indigo-bright)",
                }}
              >
                Phone
              </span>
              <span
                className='v'
                style={{
                  fontWeight: 600,
                  fontFamily: "var(--display)",
                  fontSize: "clamp(1.1rem,1.8vw,1.4rem)",
                }}
              >
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {phone}
                </a>
              </span>
            </Box>
            <Box
              className='row'
              style={{
                display: "flex",
                gap: "18px",
                alignItems: "flex-start",
                padding: "20px 0",
                borderTop: "1px solid var(--sand-line)",
                borderBottom: "1px solid var(--sand-line)",
              }}
            >
              <span
                className='k'
                style={{
                  minWidth: "96px",
                  fontWeight: 700,
                  fontFamily: "var(--mono)",
                  fontSize: "0.68rem",
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color: "var(--indigo-bright)",
                }}
              >
                Email
              </span>
              <span
                className='v'
                style={{
                  fontWeight: 600,
                  fontFamily: "var(--display)",
                  fontSize: "clamp(1.1rem,1.8vw,1.4rem)",
                }}
              >
                <a
                  href={`mailto:${email}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {email}
                </a>
              </span>
            </Box>
          </Box>
        </Box>

        {/* Message Form Column */}
        <Box
          className='form-card'
          data-reveal
          style={{
            background: "var(--cream-2)",
            border: "1px solid var(--sand-line)",
            borderRadius: "var(--radius)",
            padding: "clamp(26px,4vw,48px)",
          }}
        >
          {/* Success Banner */}
          <Box
            className={`form-ok${submitted ? " show" : ""}`}
            style={{
              display: submitted ? "flex" : "none",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              background: "color-mix(in oklab, var(--ochre) 22%, transparent)",
              border: "1px solid var(--ochre)",
              borderRadius: "var(--radius)",
              padding: "16px 18px",
              fontWeight: 600,
              color: "var(--indigo-900)",
              marginBottom: "20px",
            }}
          >
            <Box style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <svg
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                style={{ flexShrink: 0 }}
              >
                <path d='M4 10.5l4 4 8-9' />
              </svg>
              <span>Thank you — your message is on its way. I'll be in touch soon.</span>
            </Box>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              style={{
                background: "none",
                border: "none",
                color: "inherit",
                cursor: "pointer",
                padding: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.7,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
              aria-label="Close message"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </Box>

          {/* Error Banner */}
          {errorMsg && (
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                background: "rgba(255, 107, 107, 0.12)",
                border: "1px solid #ff6b6b",
                borderRadius: "var(--radius)",
                padding: "16px 18px",
                fontWeight: 600,
                color: "#ff6b6b",
                marginBottom: "20px",
              }}
            >
              <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <circle cx='12' cy='12' r='10' />
                <line x1='12' y1='8' x2='12' y2='12' />
                <line x1='12' y1='16' x2='12.01' y2='16' />
              </svg>
              {errorMsg}
            </Box>
          )}

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Box className='fld-row'>
              <Box className='fld'>
                <label htmlFor='name'>Full name *</label>
                <input
                  id='name'
                  placeholder='Your name'
                  {...form.getInputProps("name")}
                  style={{
                    borderColor: form.errors.name ? "red" : undefined,
                  }}
                />
                {form.errors.name && (
                  <Text size='xs' color='red' style={{ marginTop: "4px" }}>
                    {form.errors.name}
                  </Text>
                )}
              </Box>

              <Box className='fld'>
                <label htmlFor='tel'>Telephone</label>
                <input
                  id='tel'
                  placeholder='Optional'
                  {...form.getInputProps("tel")}
                />
              </Box>
            </Box>

            <Box className='fld'>
              <label htmlFor='email'>Email *</label>
              <input
                id='email'
                type='email'
                placeholder='you@example.com'
                {...form.getInputProps("email")}
                style={{
                  borderColor: form.errors.email ? "red" : undefined,
                }}
              />
              {form.errors.email && (
                <Text size='xs' color='red' style={{ marginTop: "4px" }}>
                  {form.errors.email}
                </Text>
              )}
            </Box>

            <Box className='fld'>
              <label htmlFor='subject'>I'm reaching out about</label>
              <input
                id='subject'
                placeholder='Commission · Collaboration · Exhibition · Media'
                {...form.getInputProps("subject")}
              />
            </Box>

            <Box className='fld'>
              <label htmlFor='msg'>Message *</label>
              <textarea
                id='msg'
                rows={5}
                placeholder='Tell me a little about your project or idea…'
                {...form.getInputProps("msg")}
                style={{
                  borderColor: form.errors.msg ? "red" : undefined,
                }}
              />
              {form.errors.msg && (
                <Text size='xs' color='red' style={{ marginTop: "4px" }}>
                  {form.errors.msg}
                </Text>
              )}
            </Box>

            <p
              className='privacy'
              style={{
                fontSize: "0.82rem",
                color: "var(--ink-soft)",
                margin: "4px 0 22px",
              }}
            >
              To respond to your enquiry, your details will be processed in
              accordance with our{" "}
              <Link
                to='/privacy'
                style={{
                  color: "var(--indigo)",
                  textDecoration: "underline",
                  textUnderlineOffset: "2px",
                }}
              >
                Privacy Policy
              </Link>
              .
            </p>

            <button
              type='submit'
              className='btn btn-primary'
              disabled={loading}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              {loading ? "Sending..." : "Send message"}
              {!loading && (
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
              )}
            </button>
          </form>
        </Box>
      </Box>

      <style>{`
        .ct-wrap {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(40px, 5vw, 80px);
          align-items: start;
        }
        @media(min-width: 920px) {
          .ct-wrap {
            grid-template-columns: 0.9fr 1.1fr;
          }
        }
        .ct-hero .display {
          font-size: clamp(2.8rem, 8vw, 6.5rem);
        }
        .ct-info .v a:hover {
          color: var(--indigo);
        }
        .fld {
          margin-bottom: 22px;
        }
        .fld label {
          display: block;
          font-family: var(--mono);
          font-size: 0.7rem;
          letter-spacing: .12em;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--ink-soft);
          margin-bottom: 9px;
        }
        .fld input, .fld textarea {
          width: 100%;
          font-family: var(--body);
          font-size: 1rem;
          color: var(--ink);
          background: var(--cream);
          border: 1px solid var(--sand-line);
          border-radius: var(--radius);
          padding: 14px 16px;
          transition: border-color .2s, box-shadow .2s;
          resize: vertical;
        }
        .fld input:focus, .fld textarea:focus {
          outline: none;
          border-color: var(--indigo);
          box-shadow: 0 0 0 3px color-mix(in oklab, var(--indigo) 16%, transparent);
        }
        .fld input::placeholder, .fld textarea::placeholder {
          color: color-mix(in oklab, var(--ink) 38%, transparent);
        }
        .fld-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0 20px;
        }
        @media(min-width: 560px) {
          .fld-row {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </Box>
  );
}
