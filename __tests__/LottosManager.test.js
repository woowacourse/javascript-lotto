import LottosManager from '../src/domain/LottosManager';

describe('[Lottos] 당첨 확인 로직 테스트', () => {
  test('각 등수별 로또 당첨 개수를 산출할 수 있다.', () => {
    // given
    const lottoList = [
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12],
      [13, 14, 15, 16, 17, 18],
    ];
    const lottosManager = new LottosManager(lottoList);
    const winningNumbers = [2, 3, 4, 5, 6, 7];
    const bonusNumber = 1;

    // when
    const winningResults = lottosManager.getWinningResults(winningNumbers, bonusNumber);

    // then
    const expectedResult = {
      6: { title: 'FIRST', count: 0 },
      B5: { title: 'SECOND', count: 1 },
      5: { title: 'THIRD', count: 0 },
      4: { title: 'FOURTH', count: 0 },
      3: { title: 'FIFTH', count: 0 },
    };

    expect(winningResults).toEqual(expectedResult);
  });
});
