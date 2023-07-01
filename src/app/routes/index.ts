import express from 'express'
import { AcademicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route'
import { AcademicDepartmentRoute } from '../modules/academicDepartment/academicDepartment.route'
import { AcademicSemesterRoute } from '../modules/academicSemester/academicSemester.route'
import { StudentRoutes } from '../modules/student/student.route'
import { UserRoute } from '../modules/user/user.route'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoute,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoute,
  },
  {
    path: '/academic-semester',
    route: AcademicSemesterRoute,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/user',
    route: UserRoute,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
