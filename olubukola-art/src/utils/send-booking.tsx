import { createServerFn } from "@tanstack/react-start";
import {
  BookingEmailData,
  sendBookingEmail as sendEmail,
  SubscriptionEmailData,
  subscribeUser,
} from "./email-service";

export const sendBookingEmail = createServerFn({ method: "POST" })
  .inputValidator((data: BookingEmailData) => data)
  .handler(async ({ data }) => {
    return await sendEmail(data);
  });

export const subscribeToNewsletter = createServerFn({ method: "POST" })
  .inputValidator((data: SubscriptionEmailData) => data)
  .handler(async ({ data }) => {
    return await subscribeUser(data);
  });
