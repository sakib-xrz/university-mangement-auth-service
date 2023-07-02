import validateRequest from '../../middlewares/validateRequest'
import express from 'express'
import { SemesterValidation } from './academicSemester.validation'
import { SemesterController } from './academicSemester.controller'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post(
  '/create-semester',
  validateRequest(SemesterValidation.createSemesterZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  SemesterController.createSemesterToDatabase
)

router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  SemesterController.getSingleSemesterFromDatabase
)

router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  SemesterController.getSemesterFromDatabase
)

router.patch(
  '/:id',
  validateRequest(SemesterValidation.updateSemesterZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  SemesterController.updateSemesterFromDatabase
)

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  SemesterController.deleteSemesterFromDatabase
)

export const AcademicSemesterRoute = router
