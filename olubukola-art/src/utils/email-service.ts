import { SOCIAL_MEDIA } from "./enums";

export interface BookingEmailData {
  firstName: string;
  lastName: string;
  email: string;
  date: string | null;
  interest: string;
  comments: string;
  agree: boolean;
}

export interface SubscriptionEmailData {
  email: string;
}

interface SendEmailWithMailjetProps {
  to: { email: string; name: string };
  subject: string;
  htmlContent: string;
}

// ==========================================
// HTML TEMPLATE FUNCTIONS
// ==========================================

export function generateBookingEmailHTML(data: BookingEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Booking Request</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
          New Booking Request from Olubukola Art Gallery
        </h2>

        <h3 style="color: #34495e; margin-top: 30px;">Customer Details:</h3>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 10px 0;"><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #3498db;">${data.email}</a></p>
          <p style="margin: 10px 0;"><strong>Preferred Date:</strong> ${data.date ? new Date(data.date).toLocaleDateString() : "Not specified"}</p>
          <p style="margin: 10px 0;"><strong>Interest:</strong> ${data.interest}</p>
          <p style="margin: 10px 0;"><strong>Comments:</strong> ${data.comments || "No comments provided"}</p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 14px;">
          <p>This booking request was submitted through the Olubukola Art Gallery website.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function generateSubscriptionEmailHTML(
  data: SubscriptionEmailData
): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Welcome to Olubukola Art Newsletter</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2c3e50; margin-bottom: 10px;">Welcome to Olubukola Art!</h1>
          <p style="color: #666; font-size: 16px;">Thank you for subscribing with ${data.email}</p>
        </div>

        <div style="background-color: #f8f9fa; padding: 30px; border-radius: 8px; margin: 20px 0; text-align: center;">
          <h2 style="color: #34495e; margin-bottom: 20px;">🎨 Your Creative Journey Begins Here</h2>
          <p style="margin: 15px 0; font-size: 16px;">
            Get ready to receive exclusive updates on:
          </p>
          <ul style="text-align: left; display: inline-block; margin: 20px 0;">
            <li style="margin: 10px 0;">Latest art exhibitions and collections</li>
            <li style="margin: 10px 0;">Behind-the-scenes studio updates</li>
            <li style="margin: 10px 0;">Exclusive art tutorials and techniques</li>
            <li style="margin: 10px 0;">Limited edition prints and digital downloads</li>
            <li style="margin: 10px 0;">Special offers and early access to new releases</li>
          </ul>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <p style="font-size: 18px; color: #2c3e50; margin-bottom: 20px;">
            <strong>Stay Connected:</strong>
          </p>
          <div style="margin: 20px 0;">
            <a href="${SOCIAL_MEDIA.YOUTUBE}" style="display: inline-block; margin: 0 10px; text-decoration: none;">
              <span style="background: #FF0000; color: white; padding: 10px 20px; border-radius: 5px;">YouTube</span>
            </a>
            <a href="${SOCIAL_MEDIA.TIKTOK}" style="display: inline-block; margin: 0 10px; text-decoration: none;">
              <span style="background: #000000; color: white; padding: 10px 20px; border-radius: 5px;">TikTok</span>
            </a>
          </div>
        </div>

        <div style="border-top: 2px solid #3498db; padding-top: 20px; margin-top: 30px; text-align: center;">
          <p style="color: #666; font-size: 14px;">
            You're receiving this because you subscribed to updates from Olubukola Art Gallery.<br>
            If you no longer wish to receive these emails, you can unsubscribe at any time.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function generateAdminSubscriptionNotificationHTML(
  data: SubscriptionEmailData
): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Newsletter Subscriber</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
          🔔 New Newsletter Subscriber
        </h2>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 10px 0;"><strong>New Subscriber Email:</strong> <a href="mailto:${data.email}" style="color: #3498db;">${data.email}</a></p>
          <p style="margin: 10px 0;"><strong>Subscription Date:</strong> ${new Date().toLocaleString()}</p>
        </div>

        <div style="margin: 30px 0;">
          <p><strong>What happens next?</strong></p>
          <ul style="margin: 15px 0;">
            <li>The subscriber has been added to your mailing list</li>
            <li>A welcome email has been sent to the subscriber</li>
            <li>Their email has been registered to our newsletter (<a href="${SOCIAL_MEDIA.NEWSLETTER}" style="color: #3498db;">${SOCIAL_MEDIA.NEWSLETTER}</a>)</li>
          </ul>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 14px;">
          <p>This is an automated notification from your Olubukola Art Gallery website.</p>
          <p>You can manage your subscribers through your email service provider or ${SOCIAL_MEDIA.NEWSLETTER} dashboard.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// ==========================================
// EMAIL SENDING UTILITIES
// ==========================================

async function sendEmailWithMailjet({
  to,
  subject,
  htmlContent,
}: SendEmailWithMailjetProps) {
  const mailjetPkg = await import("node-mailjet");
  const Client = mailjetPkg.default.Client;
  const mailjet = Client.apiConnect(
    "08a7b606d1373b362ae68c08137ce9bd", // API Key
    "6f21ab094fe3d246da411a17f93bb2fe" // API Secret
  );

  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "yinkacode@gmail.com",
          Name: "Olubukola Art Gallery",
        },
        To: [
          {
            Email: to.email,
            Name: to.name,
          },
        ],
        Subject: subject,
        HTMLPart: htmlContent,
      },
    ],
  } as any);

  const result = await request;

  return {
    success: true,
    messageId: (result as any).body.Messages[0].To[0].MessageID,
  };
}

// Kit.co subscription integration
export async function subscribeToKit(email: string) {
  try {
    // Kit.co API integration - you'll need to replace with actual Kit.co API endpoint and credentials
    // This is a placeholder - Kit.co's API documentation should provide the exact endpoint
    const kitResponse = await fetch("https://api.kit.co/v1/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.KIT_API_KEY || "your-kit-api-key"}`, // Add to environment variables
      },
      body: JSON.stringify({
        email,
        // Add other required fields based on Kit.co API documentation
      }),
    });

    if (!kitResponse.ok) {
      throw new Error(`Kit subscription failed: ${kitResponse.statusText}`);
    }

    const kitData = await kitResponse.json();
    return { success: true, kitData };
  } catch (error) {
    console.error("Kit subscription error:", error);
    throw new Error("Failed to subscribe to Kit");
  }
}

export async function sendBookingEmailWithMailjet(data: BookingEmailData) {
  const emailContent = generateBookingEmailHTML(data);

  return await sendEmailWithMailjet({
    to: { email: SOCIAL_MEDIA.EMAIL, name: "Olubukola Art Gallery" },
    subject: `New Booking Request - ${data.interest}`,
    htmlContent: emailContent,
  });
}

export async function sendBookingEmailWithResend(_data: BookingEmailData) {
  // const { Resend } = await import("resend");
  // const resend = new Resend(process.env.RESEND_API_KEY);

  // const emailContent = generateBookingEmailHTML(data);

  // const result = await resend.emails.send({
  //   from: "Olubukola Art Gallery <onboarding@resend.dev>",
  //   to: [SOCIAL_MEDIA.EMAIL],
  //   subject: `New Booking Request - ${data.interest}`,
  //   html: emailContent,
  // });

  // return { success: true, messageId: result.data?.id };
  throw new Error("Resend is not configured");
}

export async function sendBookingEmail(data: BookingEmailData) {
  try {
    return await sendBookingEmailWithMailjet(data);
    // return await sendBookingEmailWithResend(data);
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new Error("Failed to send email");
  }
}

// Subscription Email Services
export async function sendSubscriptionEmailWithMailjet(
  data: SubscriptionEmailData
) {
  const emailContent = generateSubscriptionEmailHTML(data);

  return await sendEmailWithMailjet({
    to: { email: data.email, name: "Art Enthusiast" },
    subject: "🎨 Welcome to Olubukola Art - Your Creative Journey Begins!",
    htmlContent: emailContent,
  });
}

export async function sendAdminSubscriptionNotification(
  data: SubscriptionEmailData
) {
  const emailContent = generateAdminSubscriptionNotificationHTML(data);

  return await sendEmailWithMailjet({
    to: { email: SOCIAL_MEDIA.EMAIL, name: "Olubukola Art Gallery Admin" },
    subject: "🔔 New Newsletter Subscriber - " + data.email,
    htmlContent: emailContent,
  });
}

export async function subscribeUser(data: SubscriptionEmailData) {
  try {
    // First subscribe to Kit
    // await subscribeToKit(data.email);

    // Send welcome email to subscriber
    const emailResult = await sendSubscriptionEmailWithMailjet(data);

    // Send notification email to admin
    const adminNotificationResult =
      await sendAdminSubscriptionNotification(data);

    return {
      success: true,
      message: "Successfully subscribed and emails sent",
      emailResult,
      adminNotificationResult,
    };
  } catch (error) {
    console.error("Subscription process failed:", error);
    throw new Error("Failed to complete subscription");
  }
}
