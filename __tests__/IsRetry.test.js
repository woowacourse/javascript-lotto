import IsRetry from '../src/domain/entity/IsRetry.js';

describe('재시작 여부 테스트', () => {
  test.each(['y', 'Y'])('y, Y가 들어왔을 때, true를 반환한다.', IS_RETRY => {
    const isRetry = new IsRetry(IS_RETRY);

    const answer = isRetry.get();

    expect(answer).toBe(true);
  });
  test.each(['n', 'N'])('n, N이 들어왔을 때, false를 반환한다.', IS_RETRY => {
    const isRetry = new IsRetry(IS_RETRY);

    const answer = isRetry.get();

    expect(answer).toBe(false);
  });

  test.each(['a', '1', ' '])(
    'y,Y,n,N을 제외한 문자가 들어왔을 때, 에러를 발생시킨다.',
    IS_RETRY => {
      expect(() => new IsRetry(IS_RETRY)).toThrow('[Error]');
    },
  );
});
