import { makeLottoNumbers, calculateLottoStatus, calcuateUserProfitRate } from '../helper/lotto';
import { LOTTO_RULE } from '../constants';

describe('makeLottoNumbers 함수 테스트', () => {
  test(`로또 1개당 6개의 번호가 할당된다.`, () => {
    expect(makeLottoNumbers().length).toBe(LOTTO_RULE.NUMBERS_COUNT);
  });
  test(`로또 번호는 1 부터 45 사이의 숫자로 이루어져있다.`, () => {
    const lottoNumbers = makeLottoNumbers();
    const lottoInRange = [...lottoNumbers.values()].every(
      number => number >= LOTTO_RULE.MIN_NUMBER && number <= LOTTO_RULE.MAX_NUMBER,
    );
    expect(lottoInRange).toBeTruthy();
  });
});

describe('calculateLottoStatus 함수 테스트', () => {
  test('당첨 현황을 올바르게 계산한다.', () => {
    // given
    const lottos = [
      [1, 2, 3, 4, 5, 6], // 1등
      [1, 2, 3, 4, 5, 10], // 2등
      [2, 3, 4, 5, 6, 7], // 3등
      [3, 4, 5, 6, 7, 8], // 4등
      [4, 5, 6, 7, 8, 9], // 5등
      [10, 11, 12, 13, 14, 15], // 낙첨
    ];
    const regularNumber = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 10;
    // when
    const lottoStatus = calculateLottoStatus(lottos, regularNumber, bonusNumber);
    // then
    expect(lottoStatus).toStrictEqual(
      new Map([
        [1, 1],
        [2, 1],
        [3, 1],
        [4, 1],
        [5, 1],
        ['LOSE', 1],
      ]),
    );
  });
});

describe('calcuateUserProfitRate 함수 테스트', () => {
  test('수익률을 올바르게 계산한다.', () => {
    // given
    const lottoStatus = new Map([
      [1, 1],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
      ['LOSE', 0],
    ]);
    const buyedLottoCount = 10;
    // then
    expect(calcuateUserProfitRate(lottoStatus, buyedLottoCount)).toBe(2000);
  });
});
