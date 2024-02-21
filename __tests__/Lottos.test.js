import Lottos from '../src/domain/Lottos';

describe('[Lottos] 당첨 확인 로직 테스트', () => {
  test('각 등수별 로또 당첨 개수를 산출할 수 있다.', () => {
    // given
    const lottoList = [
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12],
      [13, 14, 15, 16, 17, 18],
    ];
    const lottos = new Lottos(lottoList);
    const winningNumbers = [2, 3, 4, 5, 6, 7];
    const bonusNumber = 1;

    // when
    const winningResults = lottos.getWinningResults(winningNumbers, bonusNumber);

    // then
    const expectedResult = {
      FIRST: 0,
      SECOND: 1,
      THIRD: 0,
      FOURTH: 0,
      FIFTH: 0,
    };

    expect(winningResults).toEqual(expectedResult);
  });
});
