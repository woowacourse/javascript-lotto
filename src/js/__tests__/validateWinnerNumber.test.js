import { ERROR_MESSAGE } from '../constants/constants';
import LottoMachine from '../machine/lottoMachine';

describe('당첨 번호 입력 검증 테스트', () => {
  const lottoMachine = new LottoMachine();
  const getMatches = (input) => lottoMachine.getNumberMatches(input);

  test('올바른 값을 입력하면 오류가 발생하지 않는다.', () => {
    const validInput = { numbers: [1, 2, 3, 4, 5, 6], bonus: 7 };
    expect(() => getMatches(validInput)).not.toThrow();
  });

  test('입력한 값 중 빈 값이 없는 지 검증한다.', () => {
    const inputMissingNumbers = { numbers: [1, 2, 3, 4, 5], bonus: 8 };
    const inputMissingBonus = { numbers: [1, 2, 3, 4, 5, 6], bonus: '' };

    expect(() => getMatches(inputMissingNumbers)).toThrow(ERROR_MESSAGE.EMPTY_WINNER_INPUT);
    expect(() => getMatches(inputMissingBonus)).toThrow(ERROR_MESSAGE.EMPTY_WINNER_INPUT);
  });

  test('입력한 값 중 중복이 없는 지 검증한다.', () => {
    const duplicateInput = { numbers: [1, 2, 3, 4, 5, 6], bonus: 1 };

    expect(() => getMatches(duplicateInput)).toThrow(ERROR_MESSAGE.DUPLICATE_WINNER_INPUT);
  });

  test('입력한 값이 모두 1 - 45 범위의 자연수인지 검증한다.', () => {
    const inputSmallerNumber = { numbers: [0, 2, 3, 4, 5, 6], bonus: 1 };
    const inputLagerNumber = { numbers: [1, 2, 3, 4, 5, 46], bonus: 7 };
    const inputRealNumber = { numbers: [1.1, 2, 3, 4, 5, 6], bonus: 8 };
    const inputString = { numbers: ['one', 2, 3, 4, 5, '6'], bonus: 8 };

    expect(() => getMatches(inputSmallerNumber)).toThrow(ERROR_MESSAGE.INVALID_NUMBER_WINNER_INPUT);
    expect(() => getMatches(inputLagerNumber)).toThrow(ERROR_MESSAGE.INVALID_NUMBER_WINNER_INPUT);
    expect(() => getMatches(inputRealNumber)).toThrow(ERROR_MESSAGE.INVALID_NUMBER_WINNER_INPUT);
    expect(() => getMatches(inputString)).toThrow(ERROR_MESSAGE.INVALID_NUMBER_WINNER_INPUT);
  });
});
