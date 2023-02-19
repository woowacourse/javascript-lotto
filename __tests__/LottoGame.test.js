import LottoGame from '../src/domain/LottoGame.js';
import { LOTTO_CONDITION, LOTTO_PRIZE_MONEY } from '../src/constants/condition.js';

test(`generateLottoNumbers 메서드는 로또 자릿수(${LOTTO_CONDITION.lottoDigits}) 만큼의 길이를 가진 배열을 반환한다.`, () => {
  const lottoGame = new LottoGame();
  const lottoDigits = LOTTO_CONDITION.lottoDigits;

  const lottoNumbers = lottoGame.generateLottoNumbers(lottoDigits);

  expect(lottoNumbers).toHaveLength(lottoDigits);
});

test('makeLotto메서드는 1회 실행에 1개의 로또를 생성한다.', () => {
  const lottoGame = new LottoGame();

  const lottoNumbersList = [
    [1, 2, 3, 4, 5, 6],
    [1, 2, 3, 4, 5, 6],
    [1, 2, 3, 4, 5, 6],
  ];

  lottoNumbersList.forEach((lottoNumbers) => lottoGame.makeLotto(lottoNumbers));

  const lottoQuantity = lottoGame.getLottoQuantity();
  const processCount = lottoNumbersList.length;

  expect(lottoQuantity).toBe(processCount);
});

test('getEachCompareResult메서드는 각 로또의 당첨번호와 보너스번호 일치 여부를 객체 배열로 반환한다.', () => {
  const lottoGame = new LottoGame();
  const lottoNumbersList = [
    [1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12],
  ];

  lottoNumbersList.forEach((lottoNumbers) => lottoGame.makeLotto(lottoNumbers));

  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 7;

  const eachCompareResult = lottoGame.getEachCompareResult(winningNumbers, bonusNumber);

  const expected = [
    { matchCount: 6, hasBonusNumber: false },
    { matchCount: 0, hasBonusNumber: true },
  ];

  expect(eachCompareResult).toEqual(expected);
});

test('getStatistics메서드는 각 등수별 당첨 횟수 통계를 객체로 반환한다.', () => {
  const lottoGame = new LottoGame();

  const eachCompareResult = [
    { matchCount: 6, hasBonusNumber: false },
    { matchCount: 0, hasBonusNumber: true },
  ];

  const statistics = lottoGame.getStatistics(eachCompareResult);

  const expected = {
    firstPrize: 1,
    secondPrize: 0,
    thirdPrize: 0,
    fourthPrize: 0,
    fifthPrize: 0,
  };

  expect(statistics).toEqual(expected);
});

test('getTotalPrizeMoney메서드는 총 상금을 반환한다.', () => {
  const lottoGame = new LottoGame();

  const statistics = {
    firstPrize: 0,
    secondPrize: 0,
    thirdPrize: 0,
    fourthPrize: 1,
    fifthPrize: 1,
  };

  const totalPrizeMoney = lottoGame.getTotalPrizeMoney(statistics);

  const expected = LOTTO_PRIZE_MONEY.fifthPrize + LOTTO_PRIZE_MONEY.fourthPrize;

  expect(totalPrizeMoney).toBe(expected);
});

test('getYieldRatio메서드는 수익률을 반환한다.', () => {
  const lottoGame = new LottoGame();
  const lottoNumbers = [1, 2, 3, 4, 5, 6];
  lottoGame.makeLotto(lottoNumbers);

  const totalPrizeMoney = 5000;

  const yieldRatio = lottoGame.getYieldRatio(totalPrizeMoney);

  const expected = 500;

  expect(yieldRatio).toBe(expected);
});
