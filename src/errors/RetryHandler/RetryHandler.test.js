import Console from '../../utils/console.js';
import RetryHandler from './RetryHandler.js';

jest.mock('../../utils/console.js', () => ({
  print: jest.fn(),
}));

describe('입력 관련 예외 처리 테스트', () => {
  let executeTest;

  beforeEach(() => {
    jest.clearAllMocks();
    // given
    executeTest = jest.fn().mockRejectedValueOnce(new Error('Test Error')).mockResolvedValueOnce('Success');
  });

  test('함수가 두 번 호출된다.', async () => {
    // when
    await RetryHandler.errorWithLogging(executeTest);
    // then
    expect(executeTest).toHaveBeenCalledTimes(2);
  });

  test('첫 번째 호출은 실패 후 에러 로깅이 발생한다.', async () => {
    // when
    await RetryHandler.errorWithLogging(executeTest);
    // then
    expect(Console.print).toHaveBeenCalledWith('Test Error');
  });

  test('두 번째 호출은 성공적인 결과를 반환한다.', async () => {
    // when
    const result = await RetryHandler.errorWithLogging(executeTest);
    // then
    expect(result).toMatch('Success');
  });
});
