import WinningCalculator from '../model/winningCalculator';

describe('로또 당첨 결과 테스트', () => {
  test('당첨 번호와 로또 변호가 일치하는 개수를 확인한다.', () => {
    const lottoNumberArray = [1, 2, 3, 4, 5, 6];
    const winnerNumberArray = [1, 2, 3, 4, 5, 7];
    expect(
      winningCalculator.countNumberOfMatchingNumbers(lottoNumberArray, winnerNumberArray)
    ).toEqual(5);
  });

  const winningCalculator = new WinningCalculator();
  const lottoArray = [{ lottoNumberSet: new Set([1, 2, 3, 4, 5, 7]) }];
  const winnerNumberArray = ['1', '2', '3', '4', '5', '6'];
  const bonusNumber = '7';

  winningCalculator.calculateWinningResult(winnerNumberArray, bonusNumber, lottoArray);
  test('로또 하나의 일치한 개수에 따라 얻은 금액을 확인한다.', () => {
    expect(winningCalculator.totalWinningCount['30000000']).toEqual(1);
  });
  test('맞춘 숫자 개수에 따른 수익률을 확인한다.', () => {
    expect(winningCalculator.totalYield).toEqual(2999900);
  });
});
