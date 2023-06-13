import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiErrors'
import { SemesterTitleCodeMapper } from './semester.constant'
import { ISemester } from './semester.interface'
import { Semester } from './semester.model'

const createSemester = async (payload: ISemester): Promise<ISemester> => {
  if (SemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code')
  }

  const result = await Semester.create(payload)
  return result
}

export const SemesterService = {
  createSemester,
}
