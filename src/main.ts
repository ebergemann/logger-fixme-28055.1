import { Logger, LogLevels, LogOutputType } from './logger';

const consoleLogger = new Logger({ appName: 'test', logOutputType: LogOutputType.Console, logDirectory: './out' });

consoleLogger.logString('1) Hello World this message is good to go', LogLevels.Debug);
consoleLogger.logString('2) apikey: this message should be scrubbed', LogLevels.Error);
consoleLogger.logObject({ apikey: '3) this_value_should_be_scrubbed', message: '3) this message is good to go' });
consoleLogger.logObject({ noSensitiveInfo: '4) this message is good to go' });

const fileLogger = new Logger({ appName: 'test2', logOutputType: LogOutputType.File });

fileLogger.logString('5) Hello World File', LogLevels.Info);
fileLogger.logObject({ apikey: '6) this_value_should_be_scrubbed', someOtherDataPoint: '6) this message is good to go' });
fileLogger.logObject({ noSensitiveInfo: '7) this message is good to go' });
