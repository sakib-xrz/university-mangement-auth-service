import { NextFunction, Request, Response } from 'express'
import { SemesterService } from './semester.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { ISemester } from './semester.interface'

const createSemesterToDatabase = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...semester } = req.body
    const result = await SemesterService.createSemester(semester)
    next()
    sendResponse<ISemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester created successfully!',
      data: result,
    })
  }
)

export const SemesterController = {
  createSemesterToDatabase,
}
