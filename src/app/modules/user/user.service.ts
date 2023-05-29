import config from '../../../config'
import { IUser } from './user.interface'
import { User } from './user.model'
import generatedId from './user.utils'

const createUser = async (user_data: IUser): Promise<IUser | null> => {
  // auto generated id
  const id = await generatedId()
  user_data.id = id

  // password
  if (!user_data.password) {
    user_data.password = config.default_user_password as string
  }

  const createdUser = await User.create(user_data)
  if (!createdUser) {
    throw new Error('Failed to create user.')
  }
  return createdUser
}

export default {
  createUser,
}
