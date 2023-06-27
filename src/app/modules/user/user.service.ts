import config from '../../../config'
import ApiError from '../../../errors/ApiErrors'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateStudentId } from './user.utils'

const createUser = async (user_data: IUser): Promise<IUser | null> => {
  const semester = {
    code: '02',
    year: '2023',
  }

  // auto generated id
  const id = await generateStudentId(semester)
  user_data.id = id

  // password
  if (!user_data.password) {
    user_data.password = config.default_user_password as string
  }

  const createdUser = await User.create(user_data)

  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user.')
  }
  return createdUser
}

export const UserService = {
  createUser,
}
