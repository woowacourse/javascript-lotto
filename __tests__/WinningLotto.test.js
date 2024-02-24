import ERROR from '../src/constant/Error.js';
import WinningLotto from '../src/domain/entity/WinningLotto.js';

describe('정답 로또 테스트', () => {
  test('성공 케이스', () => {
    const WINNING_LOTTO_NUMBERS_STRING = '1,2,3,4,5,6';
    const LOTTO_NUMBERS = [1, 2, 3, 4, 5, 6];

    expect(WinningLotto.fromString(WINNING_LOTTO_NUMBERS_STRING).getNumbers()).toEqual(
      LOTTO_NUMBERS,
    );
  });

  test('6개가 아닌 숫자들을 입력받았을 때, 에러를 발생시킨다.', () => {
    const WINNING_LOTTO_NUMBERS_STRING = '1,2,3,4,5,6,7';

    expect(() => WinningLotto.fromString(WINNING_LOTTO_NUMBERS_STRING)).toThrow(
      ERROR.messageStartWith,
    );
  });

  test.each([
    [[1, 2, 3, 4, 5, 6], '6'],
    [[1, 2, 3, 4, 5, 7], '5-1'],
  ])(
    '로또번호 배열을 인자로 받았을 때, 일치 개수를 반환한다.',
    (LOTTO_NUMBERS, EXPECTED_RESULT) => {
      const WINNING_NUMBERS_STRING = '1,2,3,4,5,6';
      const BONUS_NUMBER_STRING = '7';
      const winningLotto = WinningLotto.fromString(WINNING_NUMBERS_STRING);
      winningLotto.setBonusNumberString(BONUS_NUMBER_STRING);

      expect(winningLotto.getMatchCounts(LOTTO_NUMBERS)).toBe(EXPECTED_RESULT);
    },
  );

  test('보너스 번호가 당첨 번호와 중복되었을 때, 에러를 발생시킨다.', () => {
    const BONUS_NUMBER_STRING = '1';
    const WINNING_NUMBERS_STRING = '1,2,3,4,5,6';
    const winningLotto = WinningLotto.fromString(WINNING_NUMBERS_STRING);

    expect(() => winningLotto.setBonusNumberString(BONUS_NUMBER_STRING)).toThrow(
      ERROR.messageStartWith,
    );
  });
});
