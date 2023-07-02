import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'
import config from '../../config'
import { jwtHelpers } from '../../helpers/jwtHelpers'
import ApiError from '../../errors/ApiErrors'

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.headers.authorization
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized')
      }
      // verify token
      let verifiedUser = null

      verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.access_token as Secret
      )

      req.user = verifiedUser // role  , userId

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden access')
      }
      next()
    } catch (error) {
      next(error)
    }
  }

export default auth
