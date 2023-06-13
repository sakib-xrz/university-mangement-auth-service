import {
  ISemesterCode,
  ISemesterMonth,
  ISemesterTitle,
} from './semester.interface'

export const SemesterTitle: ISemesterTitle[] = ['Spring', 'Summer', 'Fall']
export const SemesterCode: ISemesterCode[] = ['01', '02', '03']
export const SemesterMonth: ISemesterMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const SemesterTitleCodeMapper: {
  [key: string]: string
} = {
  Spring: '01',
  Summer: '02',
  Fall: '03',
}
