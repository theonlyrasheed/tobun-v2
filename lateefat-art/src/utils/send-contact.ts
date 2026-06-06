import { createServerFn } from '@tanstack/react-start'
import { type ContactEmailData, sendContactEnquiry } from './email-service'

export const sendContactEmail = createServerFn({ method: 'POST' })
  .inputValidator((data: ContactEmailData) => data)
  .handler(async ({ data }) => {
    return await sendContactEnquiry(data)
  })
