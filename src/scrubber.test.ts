import { SENSITIVE_KEYWORDS, scrubString, scrubMessage } from "./scrubber";

const redactedMessage = '<REDACTED>';

describe('scrubber', () => {
  describe('scrubString', () => {
    it('should pass through a clean string', () => {
      const goodString = "This is a good string";
      expect(scrubString(goodString)).toBe(goodString);
    });

    test.each(SENSITIVE_KEYWORDS)('should return a redacted message when %s is found', (keyword) => {
      const badString = `This is a bad string with ${keyword}`;
      expect(scrubString(badString)).toBe(redactedMessage);
    });
  });

  describe('scrubMessage', () => {
    it('should pass through a clean message', () => {
      const goodMessage = { testProperty: 'Good string', testProperty2: 'Good string 2' };
      expect(scrubMessage(goodMessage)).toEqual(goodMessage);
    });

    test.each(SENSITIVE_KEYWORDS)('should return a redacted value when %s is used as a key', (keyword) => {
      const expectedMessage: Record<string, string> = {};
      expectedMessage[keyword] = redactedMessage;

      const badKeyMessage: Record<string, string> = {};
      badKeyMessage[keyword] = "message";
      expect(scrubMessage(badKeyMessage)).toEqual(expectedMessage);
    });

    test.each(SENSITIVE_KEYWORDS)('should return a redacted value when %s is used in the message', (keyword) => {
      const expectedMessage: Record<string, string> = { testProperty: redactedMessage }
      const badKeyMessage: Record<string, string> = { testProperty: `This is a bad message with ${keyword}` }

      expect(scrubMessage(badKeyMessage)).toEqual(expectedMessage);
    });
  });
});
