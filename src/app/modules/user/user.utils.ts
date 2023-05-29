import { User } from './user.model'

const generatedId = async (): Promise<string> => {
  // get current year
  const currentYear = new Date().getFullYear().toString().slice(-2)

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
  const id = `${currentYear}-${actualId}`
  return id
}

export default generatedId
