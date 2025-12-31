import { createServerFn } from "@tanstack/react-start";
import {
  BookingEmailData,
  sendBookingEmail as sendEmail,
} from "./email-service";

export const sendBookingEmail = createServerFn({ method: "POST" })
  .inputValidator((data: BookingEmailData) => data)
  .handler(async ({ data }) => {
    return await sendEmail(data);
  });
