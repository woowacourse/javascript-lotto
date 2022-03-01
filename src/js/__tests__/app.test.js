import { LOTTO_NUMBER_COUNT, LOTTO_NUMBER_RANGE, LOTTO_PRICE } from '../constants/constants';
import LottoPurchaseMachine from '../machine/lottoPurchaseMachine.js';
import LottoWinnerMachine from '../machine/lottoWinnerMachine';
import { generateRandomNumberInRange } from '../utils/utils.js';

describe('구입 금액 검증 테스트 ', () => {
  const lottoMachine = new LottoPurchaseMachine();
  const { buyLotto } = lottoMachine;
  test('입력 값이 빈 칸이 아니어야 한다.', () => {
    const cashInput = '';
    expect(() => lottoMachine.buyLotto(cashInput)).toThrow();
  });
  test('입력 값이 1000원 단위인지 검증한다.', () => {
    const cashInput = '1500';
    expect(() => lottoMachine.buyLotto(cashInput)).toThrow();
  });
  test('입력 값의 범위가 1000원 이상 50000원 이하인지 검증한다.', () => {
    // 실패 케이스
    const lowCashInput = '900';
    expect(() => lottoMachine.buyLotto(lowCashInput)).toThrow();
    const highCashInput = '51000';
    expect(() => lottoMachine.buyLotto(highCashInput)).toThrow();

    // 성공 케이스
    const minCashInput = '1000';
    expect(() => lottoMachine.buyLotto(minCashInput)).not.toThrow();
    const maxCashInput = '50000';
    expect(() => lottoMachine.buyLotto(maxCashInput)).not.toThrow();
  });
  test('올바른 입력 값을 입력하면 오류가 발생하지 않는다.', () => {
    const cashInput = '2000';
    expect(() => lottoMachine.buyLotto(cashInput)).not.toThrow();
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
    const lottoMachine = new LottoPurchaseMachine();
    const cashInput = '5000';
    lottoMachine.buyLotto(cashInput);
    expect(lottoMachine.lottos).toHaveLength(Number(cashInput) / LOTTO_PRICE);
  });
});

describe('당첨 번호 입력 검증 테스트', () => {
  const lottoWinnerMachine = new LottoWinnerMachine();

  test('올바른 값을 입력하면 오류가 발생하지 않는다.', () => {
    const validInput = { numbers: [1, 2, 3, 4, 5, 6], bonus: 7 };
    expect(() => lottoWinnerMachine.setWinnerNumbers(validInput)).not.toThrow();
  });

  test('입력한 값 중 빈 값이 없는 지 검증한다.', () => {
    const inputMissingNumbers = { numbers: [1, 2, 3, 4, 5], bonus: 1 };
    const inputMissingBonus = { numbers: [1, 2, 3, 4, 5, 6] };

    expect(() => lottoWinnerMachine.setWinnerNumbers(inputMissingNumbers)).toThrow();
    expect(() => lottoWinnerMachine.setWinnerNumbers(inputMissingBonus)).toThrow();
  });

  test('입력한 값 중 중복이 없는 지 검증한다.', () => {
    const duplicateInput = { numbers: [1, 2, 3, 4, 5, 6], bonus: 1 };

    expect(() => lottoWinnerMachine.setWinnerNumbers(duplicateInput)).toThrow();
  });

  test('입력한 값이 모두 1 - 45 범위의 자연수인지 검증한다.', () => {
    const inputSmallerNumber = { numbers: [0, 2, 3, 4, 5, 6], bonus: 1 };
    const inputLagerNumber = { numbers: [1, 2, 3, 4, 5, 46], bonus: 1 };
    const inputRealNumber = { numbers: [1.1, 2, 3, 4, 5], bonus: 3 };
    const inputString = { numbers: ['one', 2, 3, 4, 5], bonus: 3 };

    expect(() => lottoWinnerMachine.setWinnerNumbers(inputSmallerNumber)).toThrow();
    expect(() => lottoWinnerMachine.setWinnerNumbers(inputLagerNumber)).toThrow();
    expect(() => lottoWinnerMachine.setWinnerNumbers(inputRealNumber)).toThrow();
    expect(() => lottoWinnerMachine.setWinnerNumbers(inputString)).toThrow();
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
