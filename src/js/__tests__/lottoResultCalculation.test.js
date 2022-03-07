import { WINNING_AMOUNT } from '../constants/constants';
import WinningCalculator from '../model/winningCalculator';

describe('로또 당첨 결과 테스트', () => {
  const winningCalculator = new WinningCalculator();
  const winningNumberArray = ['1', '2', '3', '4', '5', '6'];
  const bonusNumber = '7';

  test('숫자 6개 일치: 얻은 금액과 수익률을 확인한다.', () => {
    const lottoArray6 = [{ lottoNumberSet: new Set([1, 2, 3, 4, 5, 6]) }];
    winningCalculator.calculateWinningResult(winningNumberArray, bonusNumber, lottoArray6);
    expect(winningCalculator.totalWinningCount[WINNING_AMOUNT[6].toString()]).toEqual(1);
    expect(winningCalculator.totalYield).toEqual(199999900);
  });

  test('숫자 5개 + 보너스 일치: 얻은 금액과 수익률을 확인한다.', () => {
    const lottoArrayBonus = [{ lottoNumberSet: new Set([1, 2, 3, 4, 5, 7]) }];
    winningCalculator.calculateWinningResult(winningNumberArray, bonusNumber, lottoArrayBonus);
    expect(winningCalculator.totalWinningCount[WINNING_AMOUNT.BONUS.toString()]).toEqual(1);
    expect(winningCalculator.totalYield).toEqual(2999900);
  });

  test('숫자 5개 일치: 얻은 금액과 수익률을 확인한다.', () => {
    const lottoArray5 = [{ lottoNumberSet: new Set([1, 2, 3, 4, 5, 10]) }];
    winningCalculator.calculateWinningResult(winningNumberArray, bonusNumber, lottoArray5);
    expect(winningCalculator.totalWinningCount[WINNING_AMOUNT[5].toString()]).toEqual(1);
    expect(winningCalculator.totalYield).toEqual(149900);
  });

  test('숫자 4개 일치: 얻은 금액과 수익률을 확인한다.', () => {
    const lottoArray4 = [{ lottoNumberSet: new Set([1, 2, 3, 4, 9, 10]) }];
    winningCalculator.calculateWinningResult(winningNumberArray, bonusNumber, lottoArray4);
    expect(winningCalculator.totalWinningCount[WINNING_AMOUNT[4].toString()]).toEqual(1);
    expect(winningCalculator.totalYield).toEqual(4900);
  });

  test('숫자 3개 일치: 얻은 금액과 수익률을 확인한다.', () => {
    const lottoArray3 = [{ lottoNumberSet: new Set([1, 2, 3, 8, 9, 10]) }];
    winningCalculator.calculateWinningResult(winningNumberArray, bonusNumber, lottoArray3);
    expect(winningCalculator.totalWinningCount[WINNING_AMOUNT[3].toString()]).toEqual(1);
    expect(winningCalculator.totalYield).toEqual(400);
  });

  test('숫자 3개 미만 일치: 얻은 금액과 수익률을 확인한다.', () => {
    const lottoArrayMin = [{ lottoNumberSet: new Set([1, 2, 7, 8, 9, 10]) }];
    winningCalculator.calculateWinningResult(winningNumberArray, bonusNumber, lottoArrayMin);
    expect(winningCalculator.totalWinningCount[WINNING_AMOUNT.MIN.toString()]).toEqual(1);
    expect(winningCalculator.totalYield).toEqual(-100);
  });
});
