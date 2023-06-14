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

export const SemesterValidation = {
  createSemesterZodSchema,
}
