'use server'

import { z } from 'zod'
import { env } from '~/env'
import { action } from '~/lib/safe-action'

const input = z.object({
  email: z.string().email(),
})

export const joinWaitlist = action({ input }, async ({ email }) => {
  console.log({
    method: 'POST',
    headers: {
      'api-key': env.BREVO_API_KEY,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      email,
      includeListIds: [env.BREVO_LIST_ID_FOR_JOIN_WAITLIST],
      templateId: env.BREVO_TEMPLATE_ID_FOR_JOIN_WAITLIST,
      redirectionUrl: env.NEXT_PUBLIC_APP_URL,
    }),
  })
  const { status } = await fetch('https://api.brevo.com/v3/contacts/doubleOptinConfirmation', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'api-key': env.BREVO_API_KEY,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      email,
      includeListIds: [env.BREVO_LIST_ID_FOR_JOIN_WAITLIST],
      templateId: env.BREVO_TEMPLATE_ID_FOR_JOIN_WAITLIST,
      redirectionUrl: env.NEXT_PUBLIC_APP_URL,
    }),
  })

  if (status !== 201 && status !== 204) {
    throw new Error('Failed to join waitlist')
  }

  return { email }
})

export type JoinWaitlistInput = z.infer<typeof input>
