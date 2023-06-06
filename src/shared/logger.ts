/* eslint-disable no-undef */
import { createLogger, format, transports } from 'winston'
const { combine, timestamp, label, printf } = format
import path from 'path'
import DailyRotateFile from 'winston-daily-rotate-file'

// custom log format

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)
  const hour = date.getHours()
  const minutes = date.getMinutes()
  return `${date.toDateString()} ${hour}:${minutes} [${label}] ${level}: ${message}`
})

const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'AUTH' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'success',
        'success.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

const errorlogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'AUTH' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'error',
        'error.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

export { logger, errorlogger }
