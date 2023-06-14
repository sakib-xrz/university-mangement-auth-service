import { NextFunction, Request, Response } from 'express'
import { SemesterService } from './semester.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { ISemester } from './semester.interface'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { semesterFilterableFields } from './semester.constant'

const createSemesterToDatabase = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...semester } = req.body
    const result = await SemesterService.createSemester(semester)

    sendResponse<ISemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester created successfully!',
      data: result,
    })

    next()
  }
)

const getSemesterFromDataBase = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, semesterFilterableFields)
    const paginationOptions = pick(req.query, paginationFields)

    const result = await SemesterService.getSemester(filters, paginationOptions)

    sendResponse<ISemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester retrieved successfully!',
      meta: result.meta,
      data: result.data,
    })

    next()
  }
)

export const SemesterController = {
  createSemesterToDatabase,
  getSemesterFromDataBase,
}
