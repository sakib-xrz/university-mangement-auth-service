import httpStatus from 'http-status'
import { Schema, model } from 'mongoose'
import ApiError from '../../../errors/ApiErrors'
import {
  SemesterCode,
  SemesterMonth,
  SemesterTitle,
} from './academicSemester.constant'
import { ISemester, SemesterModel } from './academicSemester.interface'

const semesterSchema = new Schema<ISemester>(
  {
    title: {
      type: String,
      required: true,
      enum: SemesterTitle,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: SemesterCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: SemesterMonth,
    },
    endMonth: {
      type: String,
      required: true,
      enum: SemesterMonth,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

semesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  })

  if (isSemesterExists) {
    throw new ApiError(httpStatus.CONFLICT, 'Semester already exists!')
  } else {
    next()
  }
})

export const AcademicSemester = model<ISemester, SemesterModel>(
  'AcademicSemester',
  semesterSchema
)
