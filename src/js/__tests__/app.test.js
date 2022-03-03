import lottoManager from '../lottoManager.js';
import lottoStatisticMachine from '../lottoStatisticMachine.js';
import {
  isEnoughFare,
  isValidRangeNumber,
  isValidRangeNumbers,
  isNotOverlapped,
  isValidCount,
  isNotIncludeWinningNumbers,
} from '../validation/index.js';
import { createRandomNumbers } from '../utils/index.js';
import { LOTTO_RULES } from '../constant/index.js';

describe('요금을 1000원 이상 투입해야 한다.', () => {
  test('500원을 입력하면 false가 반환돼야 한다.', () => {
    const fare = 500;

    expect(isEnoughFare(fare)).toBe(false);
  });

  test('5000원을 입력하면 true가 반환돼야 한다.', () => {
    const fare = 5000;

    expect(isEnoughFare(fare)).toBe(true);
  });
});

describe('로또를 구매하고 남은 금액을 반환할 수 있어야 한다.', () => {
  test('1500원을 입력하면 500원이 반환돼야 한다.', () => {
    const fare = 1500;
    const remainFare = lottoManager.calculateRemainFare(fare);

    expect(remainFare).toBe(500);
  });
});

describe('입력한 요금만큼 로또를 생성할 수 있다.', () => {
  test('5000원을 입력하면 5장을 반환해야 한다.', () => {
    const fare = 5000;
    const lottoCount = lottoManager.calculateLottoCount(fare);

    expect(lottoCount).toBe(5);
  });

  test('5000원을 입력하면 5장의 로또가 생성돼야 한다.', () => {
    const fare = 5000;
    const lottoCount = lottoManager.calculateLottoCount(fare);

    expect(lottoManager.createLottos(lottoCount).length).toBe(5);
  });
});

describe(`중복되지 않는 1 ~ 45 사이의 숫자를 6개 생성한다.`, () => {
  test(`1 이상의 숫자만 있어야 한다.`, () => {
    createRandomNumbers(
      LOTTO_RULES.MIN_RANGE,
      LOTTO_RULES.MAX_RANGE,
      LOTTO_RULES.BALL_COUNT,
    ).forEach((number) => {
      expect(number).toBeGreaterThanOrEqual(LOTTO_RULES.MIN_RANGE);
    });
  });

  test(`45 이하의 숫자만 있어야 한다.`, () => {
    createRandomNumbers(
      LOTTO_RULES.MIN_RANGE,
      LOTTO_RULES.MAX_RANGE,
      LOTTO_RULES.BALL_COUNT,
    ).forEach((number) => {
      expect(number).toBeLessThanOrEqual(LOTTO_RULES.MAX_RANGE);
    });
  });

  test('중복된 숫자가 있으면 안된다', () => {
    expect(
      new Set(
        createRandomNumbers(LOTTO_RULES.MIN_RANGE, LOTTO_RULES.MAX_RANGE, LOTTO_RULES.BALL_COUNT),
      ).size,
    ).toBe(LOTTO_RULES.BALL_COUNT);
  });

  test(`6개의 숫자가 반환돼야 한다.`, () => {
    expect(
      createRandomNumbers(LOTTO_RULES.MIN_RANGE, LOTTO_RULES.MAX_RANGE, LOTTO_RULES.BALL_COUNT)
        .length,
    ).toBe(LOTTO_RULES.BALL_COUNT);
  });
});

describe('지난 주 당첨 번호는 중복되지 않는 1 ~ 45 사이의 6개의 숫자여야 한다.', () => {
  const winningNumber = [7, 15, 30, 37, 39, 44];

  test('지난주 당첨 번호 숫자들은 1 ~ 45 사이의 숫자여야 한다.', () => {
    expect(isValidRangeNumbers(winningNumber)).toBeTruthy();
  });

  test('지난주 당첨 번호에는 중복된 숫자가 있으면 안된다.', () => {
    expect(isNotOverlapped(winningNumber)).toBeTruthy();
  });

  test('지난주 당첨 번호의 숫자 개수는 6개여야 한다.', () => {
    expect(isValidCount(winningNumber)).toBeTruthy();
  });
});

describe('보너스 당첨 번호는 지난주 당첨 번호에 속해있지 않는 1 ~ 45 사이의 숫자여야 한다.', () => {
  const bonumsNumber = 18;

  test('보너스 당첨 번호는 지난주 당첨 번호에 속해있으면 안된다.', () => {
    const winningNumber = [7, 15, 30, 37, 39, 44];

    expect(isNotIncludeWinningNumbers(winningNumber, bonumsNumber)).toBeTruthy();
  });

  test('보너스 당첨 번호는 1 ~ 45 사이의 숫자여야 한다.', () => {
    expect(isValidRangeNumber(bonumsNumber)).toBeTruthy();
  });
});

const calculateEarning = (winningCounts) => {
  const prizeMoney = [5000, 50000, 1500000, 30000000, 2000000000];

  return winningCounts.reduce(
    (earnings, winningCount, index) => earnings + prizeMoney[index] * winningCount,
    0,
  );
};

const calculateRateReturn = (fare, winningCounts) => {
  const earnings = calculateEarning(winningCounts);

  return (earnings - fare) / fare;
};

describe('구매한 로또 번호와 지난주 당첨 번호, 보너스 번호를 이용해서 당첨 결과를 확인할 수 있어야 한다.', () => {
  test('구매한 로또 중 당첨된 로또를 개수를 등수 별로 계산할 수 있어야 한다.', () => {
    const lottos = [
      [7, 15, 30, 37, 39, 44],
      [7, 15, 30, 37, 39, 18],
      [7, 15, 30, 37, 39, 45],
      [7, 15, 30, 37, 40, 45],
    ];
    const winningNumbers = [7, 15, 30, 37, 39, 44];
    const bonusNumber = 18;

    const winningCounts = lottoStatisticMachine.calculateWinningCounts(
      lottos,
      winningNumbers,
      bonusNumber,
    );

    expect(winningCounts).toEqual([0, 1, 1, 1, 1]);
  });

  test('구매한 로또에 대한 수익률을 계산할 수 있어야 한다.', () => {
    const fare = 5000;
    const winningCounts = [0, 0, 1, 0, 0];

    expect(calculateRateReturn(fare, winningCounts)).toBe(299);
  });
});
