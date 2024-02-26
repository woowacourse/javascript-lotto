/* eslint-disable jest/no-conditional-expect */ // expect.assertions를 이용하여 해결
import retryAsyncWithErrorLogging from '../../src/util/retryAsyncWithErrorLogging.js';

describe('retryAsyncWithErrorLogging 단위테스트', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log');
  });

  afterEach(() => {
    console.log.mockRestore();
  });

  test('asyncFunc가 성공하면 그 결과를 반환해야한다.', async () => {
    const asyncFunc = jest.fn().mockResolvedValue('success');
    const result = await retryAsyncWithErrorLogging(asyncFunc);

    expect(result).toBe('success');
  });

  test('asyncFunc가 실패하면 에러메시지를 출력해야한다.', () => {
    expect.assertions(1);
    const error = new Error('failure');
    const asyncFunc = jest.fn().mockRejectedValue(error);

    return retryAsyncWithErrorLogging(asyncFunc, 1).catch(() => {
      expect(console.log).toHaveBeenCalledWith('failure');
    });
  });

  test.each([
    [0, 1],
    [1, 2],
    [2, 3]
  ])(
    'asyncFunc가 실패하면 maxRetries만큼 재시도해야한다. (maxRetries: %i)',
    (maxRetries, expectedCalls) => {
      expect.assertions(1);
      const error = new Error('failure');
      const asyncFunc = jest.fn().mockRejectedValue(error);

      return retryAsyncWithErrorLogging(asyncFunc, maxRetries).catch(() => {
        expect(asyncFunc).toHaveBeenCalledTimes(expectedCalls);
      });
    }
  );

  test.each([
    [0, 1],
    [1, 2],
    [2, 3]
  ])(
    'maxRetries 이후, asyncFunc가 실패하면 에러를 throw해야한다. (maxRetries: %i)',
    (maxRetries, expectedCalls) => {
      expect.assertions(2);
      const error = new Error('failure');
      const asyncFunc = jest.fn().mockRejectedValue(error);

      return retryAsyncWithErrorLogging(asyncFunc, maxRetries).catch((err) => {
        expect(err).toEqual(error);
        expect(asyncFunc).toHaveBeenCalledTimes(expectedCalls);
      });
    }
  );
});
