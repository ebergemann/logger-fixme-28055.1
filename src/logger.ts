import { scrubString, scrubMessage } from './scrubber';
import { getLoggingFunction } from './util';

export enum LogOutputType {
  Console,
  File,
}

export enum LogLevels {
  Info = 'INFO',
  Warn = 'WARN',
  Error = 'ERROR',
  Debug = 'DEBUG'
}

export type LoggerConfig = {
  logLevel: LogLevels;
  message: string | Record<string, string>;
  logDirectory: string;
}

export type LoggerProperties = {
  appName: string;
  defaultLevel?: LogLevels;
  logOutputType?: LogOutputType;
  logDirectory?: string;
}

export type LoggerPropertiesInternal = {
  appName: string;
  defaultLevel: LogLevels;
  logOutputType: LogOutputType;
  logDirectory: string;
}

export class Logger {
  properties: LoggerPropertiesInternal;

  constructor(config: LoggerProperties) {
    this.properties = {
      appName: config.appName,
      defaultLevel: config.defaultLevel || LogLevels.Info,
      logOutputType: config.logOutputType || LogOutputType.Console,
      logDirectory: config.logDirectory || './out',
    };
  }

  logString(message: string, level: LogLevels = this.properties.defaultLevel): void {
    const logger = getLoggingFunction(this.properties.logOutputType);
    logger({
      logLevel: level,
      message: scrubString(message),
      logDirectory: this.properties.logDirectory,
    });
  }

  logObject(message: {[key: string]: string}, level: LogLevels = this.properties.defaultLevel): void {
    const logger = getLoggingFunction(this.properties.logOutputType);
    logger({
      logLevel: level,
      message: scrubMessage(message),
      logDirectory: this.properties.logDirectory,
    });
  }
}
