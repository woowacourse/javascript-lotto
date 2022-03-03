import lottoManager from '../lottoManager.js';
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

const calculateHitCount = (lotto, winningNumbers) => {
  return lotto.reduce((hitCount, lottoNumber) => {
    if (winningNumbers.includes(lottoNumber)) {
      return hitCount + 1;
    }

    return hitCount;
  }, 0);
};

const convertHitCountToRank = (hitCount, isHitBonusNumber) => {
  if (hitCount === 3) {
    return 5;
  }

  if (hitCount === 4) {
    return 4;
  }

  if (hitCount === 5) {
    if (isHitBonusNumber) {
      return 2;
    }

    return 3;
  }

  return 1;
};

const checkHitBonusNumber = (lotto, bonusNumber) => lotto.includes(bonusNumber);

const calculateWinningCounts = (lottos, winningNumbers, bonumsNumber) => {
  const winningCounts = new Array(5).fill(0);

  lottos.forEach((lotto) => {
    const hitCount = calculateHitCount(lotto, winningNumbers);
    const isHitBonusNumber = checkHitBonusNumber(lotto, bonumsNumber);

    if (hitCount >= 3) {
      const rank = convertHitCountToRank(hitCount, isHitBonusNumber);

      winningCounts[rank - 1] += 1;
    }
  });

  return winningCounts.reverse();
};

describe('구매한 로또 번호와 지난주 당첨 번호, 보너스 번호를 이용해서 당첨 결과를 확인할 수 있어야 한다.', () => {
  const lottos = [
    [7, 15, 30, 37, 39, 44],
    [7, 15, 30, 37, 39, 18],
    [7, 15, 30, 37, 39, 45],
    [7, 15, 30, 37, 40, 45],
  ];
  const winningNumbers = [7, 15, 30, 37, 39, 44];
  const bonusNumber = 18;
  test('구매한 로또 중 당첨된 로또를 개수를 등수 별로 계산할 수 있어야 한다.', () => {
    expect(calculateWinningCounts(lottos, winningNumbers, bonusNumber)).toEqual([0, 1, 1, 1, 1]);
  });
});
