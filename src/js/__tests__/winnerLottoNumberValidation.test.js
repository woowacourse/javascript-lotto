import { ERROR_MESSAGE } from '../constants/constants';
import LottoGenerator from '../model/lottoGenerator';
import WinningCalculator from '../model/winningCalculator';

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

describe('당첨 번호와 보너스 번호 검증 테스트', () => {
  const winningCalculator = new WinningCalculator();
  const lottoGenerator = new LottoGenerator();

  test('모든 입력 값이 숫자인지 검증한다.', () => {
    const winnerNumberInputs = ['1', '2', '3', '4', '5', '6'];
    const bonusNumberInput = '  ';
    expect(() =>
      winningCalculator.calculateWinningResult(
        winnerNumberInputs,
        bonusNumberInput,
        lottoGenerator.lottos
      )
    ).toThrow(ERROR_MESSAGE.NOT_A_NUMBER_WINNER_NUMBER_INPUTS);
  });
  test('모든 입력 값이 1 ~ 45 사이인지 검증한다.', () => {
    const winnerNumberInputs = ['1', '2', '3', '4', '5', '6'];
    const bonusNumberInput = '100';
    expect(() =>
      winningCalculator.calculateWinningResult(
        winnerNumberInputs,
        bonusNumberInput,
        lottoGenerator.lottos
      )
    ).toThrow(ERROR_MESSAGE.OUT_OF_NUMBERS_RANGE);
  });
  test('모든 입력 값이 서로 다른지 검증한다.', () => {
    const winnerNumberInputs = ['1', '2', '3', '4', '5', '6'];
    const bonusNumberInput = '6';
    expect(() =>
      winningCalculator.calculateWinningResult(
        winnerNumberInputs,
        bonusNumberInput,
        lottoGenerator.lottos
      )
    ).toThrow(ERROR_MESSAGE.NOT_UNIQUE_NUMBERS);
  });
});
