// @ts-nocheck
import { Logger } from './logger';

const consoleLogger = new Logger({ appName: 'test', logOutputType: 'CONSOLE', logDirectory: './out' });

consoleLogger.log('1) Hello World this message is good to go', 'DEBUG');
consoleLogger.log('2) apikey: this message should be scrubbed', 'ERROR');
consoleLogger.log({ apikey: '3) this_value_should_be_scrubbed', message: '3) this message is good to go' });
consoleLogger.log({ noSensitiveInfo: '4) this message is good to go' });

const fileLogger = new Logger({ appName: 'test2', logOutputType: 'FILE' });

fileLogger.log('5) Hello World File', 'INFO');
fileLogger.log({ apikey: '6) this_value_should_be_scrubbed', someOtherDataPoint: '6) this message is good to go' });
fileLogger.log({ noSensitiveInfo: '7) this message is good to go' });
