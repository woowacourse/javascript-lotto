import ERROR from '../src/constant/Error.js';
import IsRetry from '../src/domain/entity/IsRetry.js';

describe('재시작 여부 테스트', () => {
  const RETRY_INPUTS = ['y', 'Y'];
  const NO_RETRY_INPUTS = ['n', 'N'];
  const INVALID_INPUTS = ['a', '1', ' '];

  test.each(RETRY_INPUTS)('%s가 들어왔을 때, true를 반환한다.', (IS_RETRY) => {
    const isRetry = new IsRetry(IS_RETRY);

    const answer = isRetry.get();

    expect(answer).toBe(true);
  });

  test.each(NO_RETRY_INPUTS)('%s이 들어왔을 때, false를 반환한다.', (IS_RETRY) => {
    const isRetry = new IsRetry(IS_RETRY);

    const answer = isRetry.get();

    expect(answer).toBe(false);
  });

  test.each(INVALID_INPUTS)(
    'y, Y, n, N 을 제외한 문자가 들어왔을 때, 에러를 발생시킨다.',
    (IS_RETRY) => {
      expect(() => new IsRetry(IS_RETRY)).toThrow(ERROR.messageStartWith);
    },
  );
});
