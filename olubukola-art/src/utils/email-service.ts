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

// Resend email configuration (commented out)
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

// Mailjet email configuration
export async function sendBookingEmailWithMailjet(data: BookingEmailData) {
  const mailjetPkg = await import("node-mailjet");
  const Client = mailjetPkg.default.Client;
  const mailjet = Client.apiConnect(
    "08a7b606d1373b362ae68c08137ce9bd", // API Key
    "6f21ab094fe3d246da411a17f93bb2fe" // API Secret
  );

  const emailContent = generateBookingEmailHTML(data);

  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "yinkacode@gmail.com",
          Name: "Olubukola Art Gallery",
        },
        To: [
          {
            Email: SOCIAL_MEDIA.EMAIL,
            Name: "Olubukola Art Gallery",
          },
        ],
        Subject: `New Booking Request - ${data.interest}`,
        HTMLPart: emailContent,
      },
    ],
  } as any);

  const result = await request;

  return {
    success: true,
    messageId: (result as any).body.Messages[0].To[0].MessageID,
  };
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
