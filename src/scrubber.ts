export const SENSITIVE_KEYWORDS: string[] = ['apikey', 'password', 'username', 'login'];

export function scrubString(message: string): string {
  if (findKeywords(message)) {
    return '<REDACTED>';
  }

  return message;
}

export function scrubMessage(logMessage: Record<string, string>): Record<string, string> {
  let cleanMessage: Record<string, string> = {};
  Object.keys(logMessage).forEach((messageKey) => {
    const value = logMessage[messageKey];

    if (findKeywords(messageKey)) {
      cleanMessage[messageKey] = '<REDACTED>';
    } else if (findKeywords(value)) {
      cleanMessage[messageKey] = '<REDACTED>';
    } else {
      cleanMessage[messageKey] = value
    }
  });

  return cleanMessage;
}

function findKeywords(message: string): boolean {
  return SENSITIVE_KEYWORDS.find((keyword) => {
    return message.toLowerCase().includes(keyword.toLowerCase())
  }) !== undefined;
}
