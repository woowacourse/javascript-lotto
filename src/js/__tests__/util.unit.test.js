import {
  isAllNumberInRange,
  isDividedByThousand,
  isEmptyValue,
  isNotDuplicateNumberExistInArray,
  isNotIncludeSameNumber,
  isNumberInRange,
  isPositiveValue,
} from '../utils/validator.js';
import { LOTTO, LOTTO_MATCHING_RESULT_KEY } from '../utils/constants.js';
import { calcLottoMatchingResult, calcProfit } from '../utils/lottoResultCalculator.js';

describe('구매 금액 유효성 검사 유틸 테스트', () => {
  test('금액이 천 단위인지 판단 할 수 있어야한다.', () => {
    const purchaseMoney = 3000;

    expect(isDividedByThousand(purchaseMoney)).toBe(true);
  });

  test('금액이 빈값인지 판단 할 수 있어야한다. ', () => {
    const purchaseMoney = '';

    expect(isEmptyValue(purchaseMoney)).toBe(true);
  });

  test('금액이 양의 정수인지 판단 할 수 있어야한다', () => {
    let purchaseMoney = -1000;

    expect(isPositiveValue(purchaseMoney)).toBe(false);

    purchaseMoney = 0;

    expect(isPositiveValue(purchaseMoney)).toBe(false);
  });
});

describe('당첨번호 유효성 검사 유틸 테스트', () => {
  test('번호간 중복이 없어야 한다', () => {
    const lottoWinningNumbers = [1, 2, 3, 4, 6, 7];

    expect(isNotDuplicateNumberExistInArray(lottoWinningNumbers)).toBe(true);
  });

  test('각 번호는 1이상 45이하의 숫자들로만 이루어져야한다.', () => {
    const lottoWinningNumbers = [1, 2, 3, 4, 6, 45];

    expect(isAllNumberInRange(lottoWinningNumbers, LOTTO.MIN_DIGIT, LOTTO.MAX_DIGIT)).toBe(true);
  });
});

describe('보너스번호 유효성 검사 유틸 테스트', () => {
  test('1이상 45이하의 숫자여야 한다.', () => {
    const lottoWinningBonusNumber = 1;

    expect(isNumberInRange(lottoWinningBonusNumber, LOTTO.MIN_DIGIT, LOTTO.MAX_DIGIT)).toBe(true);
  });

  test('당첨번호와 중복되지 않아야한다.', () => {
    const lottoWinningBonusNumber = 30;
    const lottoWinningNumbers = [1, 2, 3, 4, 6, 7];

    expect(isNotIncludeSameNumber(lottoWinningNumbers, lottoWinningBonusNumber)).toBe(true);
  });
});

describe('로또 당첨 결과 테스트', () => {
  test('입력한 당첨번호와 구매한 로또의 매칭 결과를 비교할 수 있어야한다.', () => {
    const winningLottoNumbers = [1, 2, 3, 4, 5, 6];
    const winningLottoBonusNumber = 7;
    const lottoList = [
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 7],
      [19, 10, 20, 21, 9, 6],
    ];

    const lottoMatchingResult = calcLottoMatchingResult(
      winningLottoNumbers,
      winningLottoBonusNumber,
      lottoList
    );

    expect(lottoMatchingResult).toStrictEqual({
      [LOTTO_MATCHING_RESULT_KEY.THREE]: 0,
      [LOTTO_MATCHING_RESULT_KEY.FOUR]: 0,
      [LOTTO_MATCHING_RESULT_KEY.FIVE]: 0,
      [LOTTO_MATCHING_RESULT_KEY.FIVE_PLUS_BONUS]: 1,
      [LOTTO_MATCHING_RESULT_KEY.SIX]: 1,
      [LOTTO_MATCHING_RESULT_KEY.NOTHING]: 1,
    });
  });

  test('로또 매칭 결과와 구매 금액을 가지고 수익률을 알아낼 수 있어야한다', () => {
    const purchaseMoney = 10000;

    const lottoMatchingResult = {
      [LOTTO_MATCHING_RESULT_KEY.THREE]: 0,
      [LOTTO_MATCHING_RESULT_KEY.FOUR]: 1,
      [LOTTO_MATCHING_RESULT_KEY.FIVE]: 1,
      [LOTTO_MATCHING_RESULT_KEY.FIVE_PLUS_BONUS]: 0,
      [LOTTO_MATCHING_RESULT_KEY.SIX]: 0,
      [LOTTO_MATCHING_RESULT_KEY.NOTHING]: 3,
    };

    expect(calcProfit(purchaseMoney, lottoMatchingResult)).toBe(15400);
  });
});
