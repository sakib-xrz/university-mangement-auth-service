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

const getSemesterFromDatabase = catchAsync(
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

const getSingleSemesterFromDatabase = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id

    const result = await SemesterService.getSingleSemester(id)

    sendResponse<ISemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester retrieved successfully !',
      data: result,
    })
  }
)

const updateSemesterFromDatabase = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const updatedData = req.body

    const result = await SemesterService.updateSemester(id, updatedData)

    sendResponse<ISemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester updated successfully !',
      data: result,
    })
  }
)

const deleteSemesterFromDatabase = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id

    const result = await SemesterService.deleteSemester(id)

    sendResponse<ISemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester deleted successfully !',
      data: result,
    })
  }
)

export const SemesterController = {
  createSemesterToDatabase,
  getSemesterFromDatabase,
  getSingleSemesterFromDatabase,
  updateSemesterFromDatabase,
  deleteSemesterFromDatabase,
}
