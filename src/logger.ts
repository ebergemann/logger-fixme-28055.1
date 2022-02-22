// @ts-nocheck
import { scrubMessage } from './scrubber';
import { LogTypeToLogger } from './util';

export class Logger {
  appName;
  defaultLevel;
  logScrubFunction;
  logOutputType;
  logDirectory;

  constructor(config) {
    this.appName = config.appName;
    this.defaultLevel = config.defaultLevel || 'INFO';
    this.logScrubFunction = config.logScrubFunction || scrubMessage;
    this.logOutputType = config.logOutputType || 'CONSOLE';
    this.logDirectory = config.logDirectory || './out';
  }

  log(message, level) {
    const logger = LogTypeToLogger[this.logOutputType];
    logger({
      logLevel: level || this.defaultLevel,
      message: this.logScrubFunction(message),
      logDirectory: this.logDirectory,
    });
  }
}
