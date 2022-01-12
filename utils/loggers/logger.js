const winston = require('winston')
require('winston-daily-rotate-file')

const {createLogger, transports,format} = winston
const {Console, DailyRotateFile} = transports

const customFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  // format.align(),
  // format.printf((i) => `${i.level}: ${[i.timestamp]}: ${i.message}`)
format.printf((i) => `${JSON.stringify(i)}`)
);

const logger = createLogger({
  format:customFormat,
  transports: [
    new Console({timestamp:true}),
    new DailyRotateFile({
      level:'info',
      filename: './logs/info.log.%DATE%',
      datePattern: 'yyyy-MM-DD',
      // format:customFormat
      /*
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
       */
    }),
    new DailyRotateFile({
      level:'error',
      filename: './logs/error.log.%DATE%',
      datePattern: 'yyyy-MM-DD',
      // format:customFormat
      /*
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
       */
    })
  ]
})
module.exports = logger
