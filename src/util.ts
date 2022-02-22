// @ts-nocheck
import fs from 'fs';
import chalk from 'chalk';

export const consoleLogger = (logConfig) => {
  const logLevel = logConfig.logLevel;
  const message = logConfig.message;

  var logMessage;
  if (typeof message === 'string') {
    logMessage = message;
  } else {
    logMessage = JSON.stringify(message, null, 2);
  }

  if (logLevel == 'INFO') {
    console.log(chalk.green(logMessage));
  } else if (logLevel == 'WARN') {
    console.log(chalk.yellow(logMessage));
  } else if (logLevel == 'ERROR') {
    console.log(chalk.red(logMessage));
  } else if (logLevel == 'DEBUG') {
    console.log(chalk.blue(logMessage));
  }
};

export const getFileLoggerFileName = () => {
  const today = new Date().toISOString();
  return today.substring(0, today.indexOf('T')); // Date string in format 2021-12-07
};

export const fileLogger = (loggingMessage) => {
  const logDirectory  = loggingMessage.logDirectory;
  const logLevel = loggingMessage.logLevel;
  const message = loggingMessage.message;

  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
  }

  const fileName = getFileLoggerFileName();
  let logMessage;
  if (typeof message === 'string') {
    logMessage = message;
  } else {
    logMessage = JSON.stringify(message);
  }
  fs.appendFileSync(logDirectory + '/' + fileName + '.log.txt', logLevel + ': ' + logMessage + '\n');
};

export const LogTypeToLogger = {
  CONSOLE: consoleLogger,
  FILE: fileLogger,
};
