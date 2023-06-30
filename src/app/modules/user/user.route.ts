import validateRequest from '../../middlewares/validateRequest'
import { UserController } from './user.controller'
import express from 'express'
import { UserValidation } from './user.validation'

const router = express.Router()

router.post(
  '/create-student',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createStudent
)

export const UserRoute = router
