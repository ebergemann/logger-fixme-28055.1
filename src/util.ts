import fs from 'fs';
import chalk from 'chalk';
import { LogOutputType, LoggerConfig, LogLevels } from './logger';

export function consoleLogger(logConfig: LoggerConfig): void {
  const logLevel = logConfig.logLevel;
  const message = logConfig.message;

  var logMessage = createStringMessage(message);
  consoleLogWithColor(logLevel, logMessage);
};

/*
  NOTE:
  Not sure this refactor is really needed. I was trying to move this functionality out for easier testing with mocks, but ran into some import issues
  and after having worked through parts of this exercise for a couple hours, decided I'd spent enough time on it. I would probably not have this in
  a final product.
*/
export function consoleLogWithColor(logLevel: LogLevels, logMessage: string): void {
  if (logLevel === LogLevels.Info) {
    console.log(chalk.green(logMessage));
  } else if (logLevel === LogLevels.Warn) {
    console.log(chalk.yellow(logMessage));
  } else if (logLevel === LogLevels.Error) {
    console.log(chalk.red(logMessage));
  } else if (logLevel === LogLevels.Debug) {
    console.log(chalk.blue(logMessage));
  }
}

export function getFileLoggerFileName(): string {
  const today = new Date().toISOString();
  return today.substring(0, today.indexOf('T')); // Date string in format 2021-12-07
};

export function fileLogger(loggingMessage: LoggerConfig): void {
  const logDirectory  = loggingMessage.logDirectory;
  const logLevel = loggingMessage.logLevel;
  const message = loggingMessage.message;

  

  const fileName = getFileLoggerFileName();
  const logMessage = createStringMessage(message);

  appendToLogFile(fileName, logLevel, logMessage, logDirectory);
};

/*
  NOTE:
  Not sure this refactor is really needed. I was trying to move this functionality out for easier testing with mocks, but ran into some import issues
  and after having worked through parts of this exercise for a couple hours, decided I'd spent enough time on it. I would probably not have this in
  a final product.
*/
export function appendToLogFile(fileName: string, logLevel: LogLevels, logMessage: string, logDirectory: string): void {
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
  }

  fs.appendFileSync(logDirectory + '/' + fileName + '.log.txt', logLevel + ': ' + logMessage + '\n');
}

export function getLoggingFunction(type: LogOutputType): Function {
  if (type === LogOutputType.Console) {
    return consoleLogger;
  } else {
    return fileLogger;
  }
}

function createStringMessage(message: string | Record<string, string>) {
  if (typeof message === 'string') {
    return message;
  } else {
    return JSON.stringify(message);
  }
}
