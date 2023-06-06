import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import userRoute from './app/modules/user/user.route'
const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// application Routes
app.use('/api/v1/user', userRoute)

// test
app.get('/', (req: Request, res: Response) => {
  res.send('Working Successfully')
})

export default app
