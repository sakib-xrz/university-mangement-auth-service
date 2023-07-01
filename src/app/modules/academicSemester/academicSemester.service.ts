import httpStatus from 'http-status'
import { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiErrors'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import {
  SemesterTitleCodeMapper,
  semesterSearchableFields,
} from './academicSemester.constant'
import { ISemester, ISemesterFilters } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'

const createSemester = async (payload: ISemester): Promise<ISemester> => {
  if (SemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code')
  }

  const result = await AcademicSemester.create(payload)
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

  const result = await AcademicSemester.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await AcademicSemester.countDocuments(whereConditions)

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
  const result = await AcademicSemester.findById(id)
  return result
}

const updateSemester = async (
  id: string,
  payload: Partial<ISemester>
): Promise<ISemester | null> => {
  if (
    payload.title &&
    payload.code &&
    SemesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code')
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteSemester = async (id: string): Promise<ISemester | null> => {
  const result = await AcademicSemester.findByIdAndDelete(id)
  return result
}

export const SemesterService = {
  createSemester,
  getSemester,
  getSingleSemester,
  updateSemester,
  deleteSemester,
}
