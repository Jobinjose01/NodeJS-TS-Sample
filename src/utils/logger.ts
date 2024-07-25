import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';
import fs from 'fs';

const logDirectory = path.resolve(__dirname, '../logs');

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const dailyRotateFileTransport = new transports.DailyRotateFile({
  filename: path.join(logDirectory, '%DATE%-error.log'),
  datePattern: 'YYYY-MM-DD',
  maxFiles: '30d',
});

const logger = createLogger({
  level: 'error',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
  ),
  transports: [dailyRotateFileTransport, new transports.Console()],
});

export default logger;
