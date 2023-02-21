const WinningLotto = require('../src/js/domain/WinningLotto');

describe('WinningLotto 메서드 테스트', () => {
  test.each([
    [[1, 2, 3, 8, 10, 11], 3],
    [[1, 2, 3, 4, 5, 6], 6],
    [[41, 27, 28, 38, 10, 11], 0],
  ])('일치하는 번호의 갯수를 구한다.', (lotto, matchCount) => {
    //given
    const winningNumber = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;
    const winningLotto = new WinningLotto(winningNumber, bonusNumber);

    // then
    expect(winningLotto.matchCount(lotto)).toEqual(matchCount);
  });

  test('보너스 번호가 있는지 확인한다.', () => {
    //given
    const winningNumber = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;
    const winningLotto = new WinningLotto(winningNumber, bonusNumber);
    const lotto = [1, 2, 3, 8, 10, 7];

    // when
    const hasBonusNumber = winningLotto.hasBonusNumber(lotto);

    // then
    expect(hasBonusNumber).toBeTruthy();
  });
});
