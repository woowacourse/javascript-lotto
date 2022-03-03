import { LOTTO_RULES } from '../constants/constants';
import LottoMachine from '../machine/lottoMachine';
import { generateRandomNumberInRange } from '../utils/utils.js';

describe('구입 금액 검증 테스트 ', () => {
  const lottoMachine = new LottoMachine();
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

describe('당첨 번호 입력 검증 테스트', () => {
  const lottoMachine = new LottoMachine();

  test('올바른 값을 입력하면 오류가 발생하지 않는다.', () => {
    const validInput = { numbers: [1, 2, 3, 4, 5, 6], bonus: 7 };
    expect(() => lottoMachine.getMatches(validInput)).not.toThrow();
  });

  test('입력한 값 중 빈 값이 없는 지 검증한다.', () => {
    const inputMissingNumbers = { numbers: [1, 2, 3, 4, 5], bonus: 1 };
    const inputMissingBonus = { numbers: [1, 2, 3, 4, 5, 6] };

    expect(() => lottoMachine.getMatches(inputMissingNumbers)).toThrow();
    expect(() => lottoMachine.getMatches(inputMissingBonus)).toThrow();
  });

  test('입력한 값 중 중복이 없는 지 검증한다.', () => {
    const duplicateInput = { numbers: [1, 2, 3, 4, 5, 6], bonus: 1 };

    expect(() => lottoMachine.getMatches(duplicateInput)).toThrow();
  });

  test('입력한 값이 모두 1 - 45 범위의 자연수인지 검증한다.', () => {
    const inputSmallerNumber = { numbers: [0, 2, 3, 4, 5, 6], bonus: 1 };
    const inputLagerNumber = { numbers: [1, 2, 3, 4, 5, 46], bonus: 1 };
    const inputRealNumber = { numbers: [1.1, 2, 3, 4, 5], bonus: 3 };
    const inputString = { numbers: ['one', 2, 3, 4, 5], bonus: 3 };

    expect(() => lottoMachine.getMatches(inputSmallerNumber)).toThrow();
    expect(() => lottoMachine.getMatches(inputLagerNumber)).toThrow();
    expect(() => lottoMachine.getMatches(inputRealNumber)).toThrow();
    expect(() => lottoMachine.getMatches(inputString)).toThrow();
  });
});

describe('당첨 금액 계산 테스트', () => {
  // 로또 번호, 당첨 번호를 머신에 저장하고 일치 계산
  const getMatchResult = (lottoArray, winnerNumbers) => {
    const lottoMachine = new LottoMachine();
    lottoMachine.lottoArray = lottoArray;
    return lottoMachine.getMatches(winnerNumbers);
  };

  test('한 개의 로또와 당첨 번호를 비교해 일치 번호의 갯수를 반환한다.', () => {
    const lottoArray = [new Set([1, 2, 3, 4, 5, 6])];
    const winnerNumbers = { numbers: [1, 2, 3, 45, 44, 43], bonus: 6 };

    const matchResult = getMatchResult(lottoArray, winnerNumbers);

    expect(matchResult.matches[3]).toEqual(1);
  });

  test('일치 번호의 갯수가 5개일 때 보너스 번호를 체크한다.', () => {
    const lottoArray = [new Set([1, 2, 3, 4, 5, 6])];
    const winnerNumbers = { numbers: [1, 2, 3, 4, 5, 7], bonus: 6 };

    const matchResult = getMatchResult(lottoArray, winnerNumbers);

    expect(matchResult.matches['5+']).toEqual(1);
  });

  test('여러 개의 로또와 당첨 번호를 비교해 일치 번호의 갯수를 반환한다.', () => {
    const lottoArray = [
      new Set([1, 2, 3, 4, 5, 6]),
      new Set([1, 2, 3, 4, 5, 8]),
      new Set([11, 12, 13, 4, 5, 7]),
      new Set([11, 12, 13, 4, 5, 7]),
      new Set([11, 12, 13, 14, 5, 7]),
    ];
    const winnerNumbers = { numbers: [1, 2, 3, 4, 5, 7], bonus: 6 };

    const manualMatch = { 2: 1, 3: 2, 5: 1, '5+': 1 };

    const matchResult = getMatchResult(lottoArray, winnerNumbers);

    expect(matchResult.matches).toEqual(manualMatch);
  });

  test('로또와 당첨번호를 비교해 수익률을 계산할 수 있다.', () => {
    const lottoArray = [
      new Set([11, 12, 13, 4, 5, 7]),
      new Set([11, 12, 13, 4, 5, 7]),
      new Set([11, 12, 13, 14, 5, 7]),
      new Set([11, 12, 13, 14, 5, 7]),
      new Set([11, 12, 13, 14, 5, 7]),
    ];
    const winnerNumbers = { numbers: [1, 2, 3, 4, 5, 7], bonus: 6 };

    const manualProfit = ((5000 * 2) / 5000) * 100 - 100;

    const matchResult = getMatchResult(lottoArray, winnerNumbers);

    expect(matchResult.profit).toEqual(manualProfit);
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
