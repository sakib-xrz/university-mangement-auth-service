import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiErrors'
import {
  SemesterTitleCodeMapper,
  semesterSearchableFields,
} from './semester.constant'
import { ISemester, ISemesterFilters } from './semester.interface'
import { Semester } from './semester.model'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { SortOrder } from 'mongoose'

const createSemester = async (payload: ISemester): Promise<ISemester> => {
  if (SemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code')
  }

  const result = await Semester.create(payload)
  return result
}

const getSemester = async (
  filters: ISemesterFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ISemester[]>> => {
  const { searchTerm, ...filtersData } = filters
  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: semesterSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const result = await Semester.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

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

const getSingleSemester = async (id: string): Promise<ISemester | null> => {
  const result = await Semester.findById(id)
  return result
}

export const SemesterService = {
  createSemester,
  getSemester,
  getSingleSemester,
}
