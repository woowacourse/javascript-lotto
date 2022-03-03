import LottoMachine from '../machine/lottoMachine';

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
