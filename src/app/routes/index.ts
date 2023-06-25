import express from 'express'
import { academicDepartmentRoute } from '../modules/academicDepartment/academicDepartment.route'
import { AcademicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route'
import { SemesterRoute } from '../modules/semester/semester.route'
import { UserRoute } from '../modules/user/user.route'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoute,
  },
  {
    path: '/semester',
    route: SemesterRoute,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoute,
  },
  {
    path: '/academic-departments',
    route: academicDepartmentRoute,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
