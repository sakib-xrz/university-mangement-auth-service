import { Model } from 'mongoose'

export type ISemesterTitle = 'Spring' | 'Summer' | 'Fall'

export type ISemesterCode = '01' | '02' | '03'

export type ISemesterMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

export type ISemester = {
  title: ISemesterTitle
  year: string
  code: ISemesterCode
  startMonth: ISemesterMonth
  endMonth: ISemesterMonth
}

export type SemesterModel = Model<ISemester>

export type ISemesterFilters = { searchTerm?: string }
