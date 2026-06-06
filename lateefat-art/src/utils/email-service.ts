export interface ContactEmailData {
  name: string
  email: string
  tel?: string
  subject?: string
  msg: string
}

// ── HTML Template ──────────────────────────────────────────────────────────

export function generateContactEmailHTML(data: ContactEmailData): string {
  const subjectLine = data.subject?.trim() || 'General Enquiry'
  const phone = data.tel?.trim() || '—'
  const year = new Date().getFullYear()
  const sentAt = new Date().toLocaleString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Enquiry — Lateefat Art</title>
</head>
<body style="margin:0;padding:0;background:#ede9e1;font-family:Georgia,'Times New Roman',serif;color:#1c1a2e;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#ede9e1;padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">

          <!-- Top label -->
          <tr>
            <td style="padding-bottom:20px;" align="center">
              <p style="margin:0;font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#9a8c7a;font-weight:600;">
                Lateefat Art &nbsp;·&nbsp; tobunlateefat.com
              </p>
            </td>
          </tr>

          <!-- Hero card -->
          <tr>
            <td style="background:#1c1a2e;border-radius:16px 16px 0 0;padding:44px 48px 36px;">
              <p style="margin:0 0 10px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#c8a96e;font-weight:700;">
                New enquiry
              </p>
              <h1 style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:32px;font-weight:400;color:#f5f0e8;line-height:1.25;font-style:italic;">
                ${subjectLine}
              </h1>
              <p style="margin:0;font-family:Arial,sans-serif;font-size:13px;color:#7a7499;line-height:1.5;">
                Received ${sentAt}
              </p>
            </td>
          </tr>

          <!-- Ochre divider stripe -->
          <tr>
            <td style="background:#c8a96e;height:3px;line-height:3px;font-size:0;">&nbsp;</td>
          </tr>

          <!-- White body -->
          <tr>
            <td style="background:#ffffff;padding:40px 48px 36px;border-radius:0;">

              <!-- Sender block -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td style="vertical-align:top;padding-right:20px;width:50%;">
                    <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#b0a899;font-weight:600;">From</p>
                    <p style="margin:0;font-size:18px;color:#1c1a2e;font-weight:400;line-height:1.3;">${data.name}</p>
                    <p style="margin:4px 0 0;">
                      <a href="mailto:${data.email}" style="font-family:Arial,sans-serif;font-size:13px;color:#4a47a3;text-decoration:none;">${data.email}</a>
                    </p>
                  </td>
                  <td style="vertical-align:top;width:50%;">
                    <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#b0a899;font-weight:600;">Phone</p>
                    <p style="margin:0;font-family:Arial,sans-serif;font-size:14px;color:#1c1a2e;">${phone}</p>
                  </td>
                </tr>
              </table>

              <!-- Hairline -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr><td style="border-top:1px solid #ede9e1;height:1px;font-size:0;">&nbsp;</td></tr>
              </table>

              <!-- Message -->
              <p style="margin:0 0 14px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#b0a899;font-weight:600;">Message</p>
              <p style="margin:0 0 32px;font-size:16px;line-height:1.8;color:#2e2b40;white-space:pre-wrap;font-family:Georgia,'Times New Roman',serif;">${data.msg}</p>

              <!-- Hairline -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr><td style="border-top:1px solid #ede9e1;height:1px;font-size:0;">&nbsp;</td></tr>
              </table>

              <!-- Reply CTA -->
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#1c1a2e;border-radius:8px;">
                    <a href="mailto:${data.email}?subject=Re%3A%20${encodeURIComponent(subjectLine)}"
                       style="display:inline-block;padding:14px 28px;font-family:Arial,sans-serif;font-size:13px;font-weight:700;color:#f5f0e8;text-decoration:none;letter-spacing:0.08em;text-transform:uppercase;">
                      Reply to ${data.name} &rarr;
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer card -->
          <tr>
            <td style="background:#f5f2ec;border-radius:0 0 16px 16px;padding:22px 48px;border-top:1px solid #e4dfd6;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:#b0a899;line-height:1.6;">
                      Sent via the contact form at
                      <a href="https://tobunlateefat.com" style="color:#c8a96e;text-decoration:none;">tobunlateefat.com</a>
                      &nbsp;&middot;&nbsp; &copy; ${year} Lateefat Art
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`
}

// ── Send via Resend ─────────────────────────────────────────────────────────

export async function sendContactEnquiry(data: ContactEmailData): Promise<{ success: boolean; error?: string }> {
  const { Resend } = await import('resend')
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.error('RESEND_API_KEY is not set.')
    return { success: false, error: 'Email service not configured on server.' }
  }

  // Resolve recipient from Sanity siteSettings, fallback to env/hardcoded
  let toEmail = ''
  try {
    const { sanityClient } = await import('@/sanity/client')
    const { siteSettingsQuery } = await import('@/sanity/queries')
    const settings = await sanityClient.fetch<any>(siteSettingsQuery)
    if (settings?.email) toEmail = settings.email.trim()
  } catch (err) {
    console.error('Could not fetch recipient email from Sanity:', err)
  }
  if (!toEmail) {
    toEmail = process.env.CONTACT_RECEIVER_EMAIL || 'hello@tobunlateefat.com'
  }

  const resend = new Resend(apiKey)
  const subject = data.subject?.trim()
    ? `Lateefat Art Enquiry: ${data.subject}`
    : `Lateefat Art Enquiry from ${data.name}`

  try {
    const { error } = await resend.emails.send({
      from: 'Lateefat Art <noreply@tobunlateefat.com>',
      to: toEmail,
      replyTo: data.email,
      subject,
      html: generateContactEmailHTML(data),
      // Plain-text fallback
      text: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.tel || 'Not provided'}\nSubject: ${data.subject || 'General Enquiry'}\n\nMessage:\n${data.msg}`,
    })

    if (error) {
      console.error('Resend error:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err: any) {
    console.error('Failed to send email:', err)
    return { success: false, error: err.message || 'Unknown error.' }
  }
}
