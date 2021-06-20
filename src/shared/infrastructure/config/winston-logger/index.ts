import { createLogger, format, Logger, transports } from 'winston';

declare global {
  type Log = Logger;
  const log: Log;
  namespace NodeJS {
    interface Global {
      log: Log;
    }
  }
}

export class WinstonLogger {
  private readonly log: Logger;

  constructor() {
    const logLevel = process.env.NODE_ENV !== 'production' ? 'debug' : 'info';
    const { combine, timestamp, colorize, printf } = format;
    let customFormat;
    if (combine) {
      if (colorize) {
        if (timestamp) {
          if (printf) {
            customFormat = combine(
              colorize(),
              timestamp(),
              printf(
                (info) => `${info.timestamp} ${info.level}: ${info.message}`,
              ),
            );
          }
        }
      }
    }

    this.log = createLogger({
      transports: [
        new transports.Console({
          format: customFormat,
          level: logLevel,
        }),
      ],
    });
  }

  // eslint-disable-next-line no-return-assign
  initializer = (): Logger => (global.log = this.log);
}
