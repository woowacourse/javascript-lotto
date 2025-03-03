import Lotto from '../../src/domain/Lotto.js';
import { LOTTO_CONDITION, LOTTO_NUMBER_ERROR_MESSAGES } from '../../src/constants/constants.js';
import WinningLotto from '../../src/domain/WinningLotto.js';

describe('Lotto 클래스 테스트', () => {
  const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

  test('로또 생성 테스트', () => {
    expect(lotto.numbers).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test.each([[[1, 2, 3, 4, 5]], [[1, 2, 3, 4, 5, 6, 7]]])(
    `로또 번호가 ${LOTTO_CONDITION.COUNT}자리가 아닌 경우 에러 발생`,
    (numbers) => {
      expect(() => new Lotto(numbers)).toThrow(LOTTO_NUMBER_ERROR_MESSAGES.COUNT);
    },
  );

  test('번호 포함 테스트', () => {
    expect(lotto.hasNumber(1)).toBe(true);
  });

  test('번호 미포함 테스트', () => {
    expect(lotto.hasNumber(10)).toBe(false);
  });

  test.each([
    [
      [1, 2, 3, 4, 5, ''],
      [1, 2, 3, 4, 5, 1.5],
    ],
  ])('로또 번호가 정수가 아닌 경우 에러 발생', (numbers) => {
    expect(() => new Lotto(numbers)).toThrow(LOTTO_NUMBER_ERROR_MESSAGES.INTIGER);
  });

  test.each([
    [
      [1, 2, 3, 4, 5, LOTTO_CONDITION.MAX_NUMBER + 1],
      [1, 2, 3, 4, 5, LOTTO_CONDITION.MIN_NUMBER - 1],
    ],
  ])(
    `로또 숫자 범위가 ${LOTTO_CONDITION.MIN_NUMBER}~${LOTTO_CONDITION.MAX_NUMBER}가 아닌 경우 에러 발생`,
    (numbers) => {
      expect(() => new Lotto(numbers)).toThrow(LOTTO_NUMBER_ERROR_MESSAGES.RANGE);
    },
  );

  test('로또 번호가 중복되는 경우 에러 발생', () => {
    expect(() => new Lotto([1, 2, 3, 4, 5, 5])).toThrow(LOTTO_NUMBER_ERROR_MESSAGES.DUPLICATE);
  });

  test.each([
    [new Lotto([1, 2, 3, 4, 5, 6]), 6],
    [new Lotto([1, 2, 3, 4, 5, 7]), 5],
    [new Lotto([1, 2, 3, 4, 15, 16]), 4],
    [new Lotto([1, 2, 3, 14, 15, 16]), 3],
    [new Lotto([1, 2, 13, 14, 15, 16]), 2],
  ])(`당첨 번호 일치 개수 테스트`, (lotto, expectedMatchCount) => {
    const winningLotto = new WinningLotto(new Lotto([1, 2, 3, 4, 5, 6]), 7);

    expect(lotto.matchWinning(winningLotto.winningNumbers)).toBe(expectedMatchCount);
  });

  test('보너스 번호 일치 여부 테스트', () => {

    expect(lotto.hasNumber(lotto.numbers[0])).toBe(true);
  });

  test('보너스 번호  불일치 여부 테스트', () => {

    expect(lotto.hasNumber(lotto.numbers[LOTTO_CONDITION.MAX_NUMBER+1])).toBe(false);
  });
});
