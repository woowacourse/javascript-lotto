import LottoGenerator from '../model/lottoGenerator.js';
import LottoNumber from '../model/lottoNumber.js';
import { generateRandomNumberInRange } from '../utils/utils';
import { LOTTO_NUMBER_COUNT, LOTTO_NUMBER_RANGE, LOTTO_PRICE } from '../constants/constants';

expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () => `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    }
    return {
      message: () => `expected ${received} not to be within range ${floor} - ${ceiling}`,
      pass: false,
    };
  },
});

describe('로또 번호 생성 테스트', () => {
  test('생성된 숫자가 1 - 45 범위인지 확인한다.', () => {
    expect(
      generateRandomNumberInRange(LOTTO_NUMBER_RANGE.MIN, LOTTO_NUMBER_RANGE.MAX)
    ).toBeWithinRange(LOTTO_NUMBER_RANGE.MIN, LOTTO_NUMBER_RANGE.MAX);
  });
  test('서로 값이 다른 숫자 6개가 생성되는지 확인한다.', () => {
    const lotto = new LottoNumber();
    expect(new Set(lotto.lottoNumberSet).size).toEqual(LOTTO_NUMBER_COUNT);
  });
  test('투입한 금액만큼의 로또가 생성되는지 확인한다.', () => {
    const lottoGenerator = new LottoGenerator();
    const cashInput = '5000';
    lottoGenerator.buyLotto(cashInput);
    expect(lottoGenerator.lottos).toHaveLength(Number(cashInput) / LOTTO_PRICE);
  });
});
