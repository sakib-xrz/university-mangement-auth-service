import validateRequest from '../../middlewares/validateRequest'
import express from 'express'
import { SemesterValidation } from './semester.validation'
import { SemesterController } from './semester.controller'

const router = express.Router()

router.post(
  '/create-semester',
  validateRequest(SemesterValidation.createSemesterZodSchema),
  SemesterController.createSemesterToDatabase
)

export const SemesterRoute = router