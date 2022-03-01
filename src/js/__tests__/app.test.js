import { LOTTO_NUMBER_COUNT, LOTTO_NUMBER_RANGE, LOTTO_PRICE } from '../constants/constants';
import LottoMachine from '../machine/lottoMachine.js';
import { generateRandomNumberInRange } from '../utils/utils.js';

describe('구입 금액 검증 테스트 ', () => {
  const { buyLotto } = new LottoMachine();
  test('입력 값이 빈 칸이 아니어야 한다.', () => {
    const cashInput = '';
    expect(() => buyLotto(cashInput)).toThrow();
  });
  test('입력 값이 1000원 단위인지 검증한다.', () => {
    const cashInput = '1500';
    expect(() => buyLotto(cashInput)).toThrow();
  });
  test('입력 값의 범위가 1000원 이상 50000원 이하인지 검증한다.', () => {
    // 실패 케이스
    const lowCashInput = '900';
    expect(() => buyLotto(lowCashInput)).toThrow();
    const highCashInput = '51000';
    expect(() => buyLotto(highCashInput)).toThrow();

    // 성공 케이스
    const minCashInput = '1000';
    expect(() => buyLotto(minCashInput)).not.toThrow();
    const maxCashInput = '50000';
    expect(() => buyLotto(maxCashInput)).not.toThrow();
  });
  test('올바른 입력 값을 입력하면 오류가 발생하지 않는다.', () => {
    const cashInput = '2000';
    expect(() => buyLotto(cashInput)).not.toThrow();
  });
});

describe('로또 번호 생성 테스트', () => {
  test('범위가 1 - 45인 고유한 숫자 6개가 생성되는지 확인한다.', () => {
    const lotto = new Set(
      generateRandomNumberInRange({
        min: LOTTO_NUMBER_RANGE.MIN,
        max: LOTTO_NUMBER_RANGE.MAX,
        count: LOTTO_NUMBER_COUNT,
      })
    );
    expect(lotto.size).toEqual(LOTTO_NUMBER_COUNT);
    lotto.forEach((number) =>
      expect(number).toBeWithinRange(LOTTO_NUMBER_RANGE.MIN, LOTTO_NUMBER_RANGE.MAX)
    );
  });

  test('투입한 금액만큼의 로또가 생성되는지 확인한다.', () => {
    const lottoMachine = new LottoMachine();
    const cashInput = '5000';
    lottoMachine.buyLotto(cashInput);
    expect(lottoMachine.lottos).toHaveLength(Number(cashInput) / LOTTO_PRICE);
  });
});

describe('당첨 번호 입력 검증 테스트', () => {
  const { setWinnerNumbers } = new lottoWinnerMachine();
  test('입력한 값 중 빈 값이 없는 지 검증한다.', () => {
    const inputMissingNumbers = { numbers: [1, 2, 3, 4, 5], bonus: 1 };
    const inputMissingBonus = { numbers: [1, 2, 3, 4, 5, 6] };
    const validInput = { numbers: [1, 2, 3, 4, 5, 6], bonus: 7 };

    expect(() => setWinnerNumbers(inputMissingNumbers)).toThrow();
    expect(() => setWinnerNumbers(inputMissingBonus)).toThrow();
    expect(() => setWinnerNumbers(validInput)).not.toThrow();
  });

  test('입력한 값 중 중복이 없는 지 검증한다.', () => {
    const duplicateInput = { numbers: [1, 2, 3, 4, 5, 6], bonus: 1 };
    const validInput = { numbers: [1, 2, 3, 4, 5, 6], bonus: 7 };

    expect(() => setWinnerNumbers(duplicateInput)).toThrow();
    expect(() => setWinnerNumbers(validInput)).not.toThrow();
  });

  test('입력한 값이 모두 1 - 45 범위의 자연수인지 검증한다.', () => {
    const inputSmallerNumber = { numbers: [0, 2, 3, 4, 5, 6], bonus: 1 };
    const inputLagerNumber = { numbers: [1, 2, 3, 4, 5, 46], bonus: 1 };
    const inputRealNumber = { numbers: [1.1, 2, 3, 4, 5], bonus: 3 };
    const inputString = { numbers: ['one', 2, 3, 4, 5], bonus: 3 };
    const validInput = { numbers: [1, 2, 3, 4, 5, 45], bonus: 7 };

    expect(() => setWinnerNumbers(inputSmallerNumber)).toThrow();
    expect(() => setWinnerNumbers(inputLagerNumber)).toThrow();
    expect(() => setWinnerNumbers(inputRealNumber)).toThrow();
    expect(() => setWinnerNumbers(inputString)).toThrow();
    expect(() => setWinnerNumbers(validInput)).not.toThrow();
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
