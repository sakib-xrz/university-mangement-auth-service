import { z } from 'zod'
import { SemesterCode, SemesterMonth, SemesterTitle } from './semester.constant'

const createSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...SemesterTitle] as [string, ...string[]], {
      required_error: 'title is required',
    }),
    year: z.string({
      required_error: 'year is required',
    }),
    code: z.enum([...SemesterCode] as [string, ...string[]], {
      required_error: 'code is required',
    }),
    startMonth: z.enum([...SemesterMonth] as [string, ...string[]], {
      required_error: 'start month is required',
    }),
    endMonth: z.enum([...SemesterMonth] as [string, ...string[]], {
      required_error: 'end month is required',
    }),
  }),
})

const updateSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...SemesterTitle] as [string, ...string[]], {
          required_error: 'title is required',
        })
        .optional(),
      year: z
        .string({
          required_error: 'year is required',
        })
        .optional(),
      code: z
        .enum([...SemesterCode] as [string, ...string[]], {
          required_error: 'code is required',
        })
        .optional(),
      startMonth: z
        .enum([...SemesterMonth] as [string, ...string[]], {
          required_error: 'start month is required',
        })
        .optional(),
      endMonth: z
        .enum([...SemesterMonth] as [string, ...string[]], {
          required_error: 'end month is required',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    { message: 'Either provide both title and code or neither' }
  )

export const SemesterValidation = {
  createSemesterZodSchema,
  updateSemesterZodSchema,
}
