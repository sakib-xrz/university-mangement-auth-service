import { Schema, model } from 'mongoose'
import { ISemester, SemesterModel } from './semester.interface'
import { SemesterCode, SemesterMonth, SemesterTitle } from './semester.constant'
import ApiError from '../../../errors/ApiErrors'
import httpStatus from 'http-status'

const semesterSchema = new Schema<ISemester>(
  {
    title: {
      type: String,
      required: true,
      enum: SemesterTitle,
    },
    year: {
      type: Number,
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
  }
)

semesterSchema.pre('save', async function (next) {
  const isSemesterExists = await Semester.findOne({
    title: this.title,
    year: this.year,
  })

  if (isSemesterExists) {
    throw new ApiError(httpStatus.CONFLICT, 'Semester already exists!')
  } else {
    next()
  }
})

export const Semester = model<ISemester, SemesterModel>(
  'Semester',
  semesterSchema
)
