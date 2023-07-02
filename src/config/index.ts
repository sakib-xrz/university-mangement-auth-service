import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  env: process.env.ENV,
  port: process.env.PORT,
  database_uri: process.env.DATABASE_URI,
  default_student_password: process.env.DEFAULT_STUDENT_PASSWORD,
  default_faculty_password: process.env.DEFAULT_FACULTY_PASSWORD,
  default_admin_password: process.env.DEFAULT_ADMIN_PASSWORD,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  jwt: {
    access_token: process.env.ACCESS_TOKEN_SECRET,
    refresh_token: process.env.REFRESH_TOKEN_SECRET,
    access_expires: process.env.ACCESS_TOKEN_EXPIRES_IN,
    refresh_expires: process.env.REFRESH_TOKEN_EXPIRES_IN,
  },
}
