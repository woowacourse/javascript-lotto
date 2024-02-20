import WinningLotto from '../src/domain/entity/WinningLotto.js';

describe('정답 로또 테스트', () => {
  test('성공 케이스', () => {
    const WINNING_LOTTO_NUMBERS_STRING = '1,2,3,4,5,6';
    const LOTTO_NUMBERS = [1, 2, 3, 4, 5, 6];

    expect(new WinningLotto(WINNING_LOTTO_NUMBERS_STRING).getNumbers()).toEqual(
      LOTTO_NUMBERS,
    );
  });

  test('6개가 아닌 숫자들을 입력받았을 때, 에러를 발생시킨다.', () => {
    const WINNING_LOTTO_NUMBERS_STRING = '1,2,3,4,5,6,7';

    expect(() => new WinningLotto(WINNING_LOTTO_NUMBERS_STRING)).toThrow(
      '[Error]',
    );
  });

  test('로또번호 배열을 인자로 받았을 때, 일치 개수를 반환한다.', () => {
    const WINNING_NUMBERS_STRING = '1,2,3,4,5,6';
    const winningLotto = new WinningLotto(WINNING_NUMBERS_STRING);
    const LOTTO_NUMBERS = [1, 2, 3, 4, 5, 6];

    expect(winningLotto.getMatchNumberCount(LOTTO_NUMBERS)).toBe(6);
  });
});
