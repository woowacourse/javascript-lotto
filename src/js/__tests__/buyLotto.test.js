import { LOTTO_RULES } from '../constants/constants';
import LottoMachine from '../machine/lottoMachine';
import { generateRandomNumberInRange } from '../utils/utils';

describe('로또 번호 생성 테스트', () => {
  test('범위가 1 - 45인 고유한 숫자 6개가 생성되는지 확인한다.', () => {
    const lotto = new Set(
      generateRandomNumberInRange({
        min: LOTTO_RULES.NUMBER_RANGE.MIN,
        max: LOTTO_RULES.NUMBER_RANGE.MAX,
        count: LOTTO_RULES.NUMBER_COUNT,
      })
    );
    expect(lotto.size).toEqual(LOTTO_RULES.NUMBER_COUNT);
    lotto.forEach((number) =>
      expect(number).toBeWithinRange(LOTTO_RULES.NUMBER_RANGE.MIN, LOTTO_RULES.NUMBER_RANGE.MAX)
    );
  });

  test('투입한 금액만큼의 로또가 생성되는지 확인한다.', () => {
    const lottoMachine = new LottoMachine();
    const cashInput = '5000';
    lottoMachine.buyLotto(cashInput);
    expect(lottoMachine.lottoArray).toHaveLength(Number(cashInput) / LOTTO_RULES.PRICE);
  });
});

expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () => `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    }
    return {
      message: () => `expected ${received} to be within range ${floor} - ${ceiling}`,
      pass: false,
    };
  },
});
