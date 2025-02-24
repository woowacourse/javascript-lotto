import Lotto from '../src/domain/Lotto.js';
import { LOTTO_CONDITION, LOTTO_NUMBER_ERROR_MESSAGES } from '../src/constants/constants.js';

describe('Lotto 클래스 테스트', () => {
  let lotto;

  beforeEach(() => {
    lotto = new Lotto([1, 2, 3, 4, 5, 6]);
  });

  test('Lotto 클래스를 초기화했을 때, 로또 객체가 잘 생성된다', () => {
    expect(lotto.numbers).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('로또 객체에 특정 번호가 포함되어 있으면 true를 반환한다', () => {
    expect(lotto.includeNumber(1)).toBe(true);
  });

  test('로또 객체에 특정 번호가 포함되어 있지 않으면 false를 반환한다', () => {
    expect(lotto.includeNumber(10)).toBe(false);
  });
});

describe('Lotto 유효성 검사 테스트', () => {
  test.each([[[1, 2, 3, 4, 5]], [[1, 2, 3, 4, 5, 6, 7]]])(
    `로또 개수가 ${LOTTO_CONDITION.COUNT}개가 아닌 경우 에러를 발생시킨다`,
    (numbers) => {
      expect(() => new Lotto(numbers)).toThrow(LOTTO_NUMBER_ERROR_MESSAGES.COUNT);
    },
  );

  test.each([
    [
      [1, 2, 3, 4, 5, ''],
      [1, 2, 3, 4, 5, 1.5],
    ],
  ])('정수가 아닌 번호가 포함되어 있는 경우 에러를 발생시킨다', (numbers) => {
    expect(() => new Lotto(numbers)).toThrow(LOTTO_NUMBER_ERROR_MESSAGES.INTIGER);
  });

  test.each([
    [
      [1, 2, 3, 4, 5, LOTTO_CONDITION.MAX_NUMBER + 1],
      [1, 2, 3, 4, 5, LOTTO_CONDITION.MIN_NUMBER - 1],
    ],
  ])(
    `로또 숫자 범위가 ${LOTTO_CONDITION.MIN_NUMBER}~${LOTTO_CONDITION.MAX_NUMBER}가 아닌 경우 에러를 발생시킨다`,
    (numbers) => {
      expect(() => new Lotto(numbers)).toThrow(LOTTO_NUMBER_ERROR_MESSAGES.RANGE);
    },
  );

  test('로또 번호에 중복되는 숫자가 있는 경우 에러를 발생시킨다', () => {
    expect(() => new Lotto([1, 2, 3, 4, 5, 5])).toThrow(LOTTO_NUMBER_ERROR_MESSAGES.DUPLICATE);
  });
});
