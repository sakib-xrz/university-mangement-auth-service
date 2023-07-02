import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiErrors'
import { User } from '../user/user.model'
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import config from '../../../config'
import { Secret } from 'jsonwebtoken'

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload

  const isUserExists = await User.isUserExist(id)

  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists')
  }

  const isPasswordMatched = await User.isPasswordMatched(
    password,
    isUserExists.password
  )

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect password')
  }

  const { id: userId, role, needsPasswordChange } = isUserExists
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.access_token as Secret,
    config.jwt.access_expires as string
  )

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_token as Secret,
    config.jwt.refresh_expires as string
  )

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  }
}

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  // invalid token - synchronous
  let verifiedToken = null

  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_token as Secret
    )
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token')
  }

  const { userId } = verifiedToken

  // checking deleted user's refresh token

  const isUserExist = await User.isUserExist(userId)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.access_token as Secret,
    config.jwt.access_expires as string
  )

  return {
    accessToken: newAccessToken,
  }
}

export const AuthService = {
  loginUser,
  refreshToken,
}
