import validateRequest from '../../middlewares/validateRequest'
import express from 'express'
import { SemesterValidation } from './academicSemester.validation'
import { SemesterController } from './academicSemester.controller'

const router = express.Router()

router.post(
  '/create-semester',
  validateRequest(SemesterValidation.createSemesterZodSchema),
  SemesterController.createSemesterToDatabase
)

router.patch(
  '/:id',
  validateRequest(SemesterValidation.updateSemesterZodSchema),
  SemesterController.updateSemesterFromDatabase
)

router.delete('/:id', SemesterController.deleteSemesterFromDatabase)

router.get('/:id', SemesterController.getSingleSemesterFromDatabase)

router.get('/', SemesterController.getSemesterFromDatabase)

export const AcademicSemesterRoute = router
