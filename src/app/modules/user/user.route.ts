import { UserController } from './user.controller'
import express from 'express'

const router = express.Router()

router.post('/create-user', UserController.createUserToDatabase)

export const UserRoute = router
