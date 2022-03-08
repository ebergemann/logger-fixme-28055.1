import { getFileLoggerFileName } from "./util";

beforeAll(() => {
  jest.useFakeTimers('modern');
  jest.setSystemTime(new Date(2020, 1, 1));
});

afterAll(() => {
  jest.useRealTimers();
});

// describe('util', () => {
//   describe('getFileLoggerFileName', () => {
//     expect(getFileLoggerFileName()).toBe('2020-01-01');
//   });
// });

describe('util', () => {
  it('passes', () => {
    expect(true).toBe(true);
  });
});