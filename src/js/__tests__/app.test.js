import LottoManagerImpl from '../LottoManager/LottoManagerImpl.js';
import ValidatorImpl from '../ValidatorImpl/index.js';
import LottoCountCalcultor from '../CalculatorImpl/LottoCountCalculator.js';
import RemainFareCalculator from '../CalculatorImpl/RemainFareCalculator.js';
import { createRandomNumbers } from '../utils/index.js';
import { LOTTO_RULES } from '../constant/index.js';

describe('요금을 1000원 이상 투입해야 한다.', () => {
  const { isEnoughFare } = new ValidatorImpl().checkFunctions;

  test('1000원 미만은 게임을 실행할 수 없다.', () => {
    const fare1 = 500;
    const fare2 = -500;
    const fare3 = 100.1;
    const fare4 = 999;

    expect(isEnoughFare(fare1)).toBe(false);
    expect(isEnoughFare(fare2)).toBe(false);
    expect(isEnoughFare(fare3)).toBe(false);
    expect(isEnoughFare(fare4)).toBe(false);
  });

  test('1000원 이상으로 게임 실행이 가능하다.', () => {
    const fare1 = 1000;
    const fare2 = 1000.01;

    expect(isEnoughFare(fare1)).toBe(true);
    expect(isEnoughFare(fare2)).toBe(true);
  });
});

describe('로또를 구매하고 남은 금액을 반환할 수 있어야 한다.', () => {
  test('1500원을 입력하면 500원이 반환돼야 한다.', () => {
    const fare = 1500;

    expect(new RemainFareCalculator(fare).execute()).toBe(500);
  });
});

describe('입력한 요금만큼 로또를 생성할 수 있다.', () => {
  test('5000원을 입력하면 5를 반환해야 한다.', () => {
    const fare = 5000;

    expect(new LottoCountCalcultor(fare).execute()).toBe(5);
  });

  test('5000원을 입력하면 5개의 로또가 생성돼야 한다.', () => {
    const lottoManager = new LottoManagerImpl();
    const fare = 5000;

    lottoManager.createLottos(new LottoCountCalcultor(fare).execute());

    expect(lottoManager.getLottos().length).toBe(5);
  });
});

describe(`중복되지 않는 ${LOTTO_RULES.MIN_RANGE} ~ ${LOTTO_RULES.MAX_RANGE} 사이의 숫자를 ${LOTTO_RULES.BALL_COUNT}개 생성한다.`, () => {
  test(`${LOTTO_RULES.MIN_RANGE}이상의 숫자만 있어야 한다.`, () => {
    createRandomNumbers(
      LOTTO_RULES.MIN_RANGE,
      LOTTO_RULES.MAX_RANGE,
      LOTTO_RULES.BALL_COUNT,
    ).forEach((number) => {
      expect(number).toBeGreaterThanOrEqual(LOTTO_RULES.MIN_RANGE);
    });
  });

  test(`${LOTTO_RULES.MAX_RANGE}이하의 숫자만 있어야 한다.`, () => {
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
      createRandomNumbers(LOTTO_RULES.MIN_RANGE, LOTTO_RULES.MAX_RANGE, LOTTO_RULES.BALL_COUNT)
        .length,
    ).toBe(LOTTO_RULES.BALL_COUNT);

    expect(
      new Set(
        createRandomNumbers(LOTTO_RULES.MIN_RANGE, LOTTO_RULES.MAX_RANGE, LOTTO_RULES.BALL_COUNT),
      ).size,
    ).toBe(LOTTO_RULES.BALL_COUNT);
  });
});
