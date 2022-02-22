// @ts-nocheck
export const SENSITIVE_KEYWORDS = ['apikey', 'password', 'username', 'login'];

export const scrubString = (message) => {
  if (typeof message != 'string') {
    throw new Error('Invalid message');
  }
  // TODO: Given a string message, determine if there are any sensitive keywords and replace with '<REDACTED>'
};

export const scrubMessage = (logMessage) => {
  if (typeof logMessage != 'string' && typeof logMessage != 'object') {
    return logMessage;
  }
  if (logMessage == null) {
    return logMessage;
  }

  if (typeof logMessage == 'string') {
    return scrubString(logMessage);
  }

  let cleanMessage = {};
  const messageKeys = Object.keys(logMessage);
  for(var i = 0; i < messageKeys.length; i++) {
    const messageKey = messageKeys[i];
    const value = logMessage[messageKeys[i]];

    if(SENSITIVE_KEYWORDS.find((keyword) => { return messageKey.toLowerCase().indexOf(keyword.toLowerCase()) >= 0; })) {
      cleanMessage[messageKey] = '<REDACTED>';
    } else if(SENSITIVE_KEYWORDS.find((keyword) => { return value.toLowerCase().indexOf(keyword.toLowerCase()) >= 0; })) {
      cleanMessage[messageKey] = '<REDACTED>';
    } else {
      cleanMessage[messageKey] = value
    }
  }

  return cleanMessage;
};
