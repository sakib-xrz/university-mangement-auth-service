import { User } from './user.model'

export const generatedId = async (): Promise<string> => {
  // get current year
  const currentYear = new Date().getFullYear().toString().slice(-2)

  // get current month
  const currentMonth = new Date().getMonth() + 1

  // get last user id from db
  const lastUserId = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()

  let actualId: string
  if (lastUserId) {
    const lastId = lastUserId.id.slice(-4)
    const nextId = (parseInt(lastId) + 1).toString().padStart(4, '0')
    actualId = nextId
  } else {
    actualId = '0001'
  }

  let monthCode: string
  if (currentMonth >= 1 && currentMonth <= 4) {
    monthCode = '01'
  } else if (currentMonth >= 5 && currentMonth <= 8) {
    monthCode = '02'
  } else {
    monthCode = '03'
  }

  const id = `${currentYear}-${monthCode}-${actualId}`
  return id
}
