import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiErrors'
import { SemesterTitleCodeMapper } from './semester.constant'
import { ISemester } from './semester.interface'
import { Semester } from './semester.model'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'

const createSemester = async (payload: ISemester): Promise<ISemester> => {
  if (SemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code')
  }

  const result = await Semester.create(payload)
  return result
}

const getSemester = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ISemester[]>> => {
  const { page = 1, limit = 10 } = paginationOptions

  const skip = (page - 1) * limit

  const result = await Semester.find().sort().skip(skip).limit(limit)

  const total = await Semester.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

export const SemesterService = {
  createSemester,
  getSemester,
}
