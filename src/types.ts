import { z } from "zod"

export const ResponseSchema = z.object({
  answer: z.boolean(),
  response: z.string(),
})

export type ResponseType = z.infer<typeof ResponseSchema>
