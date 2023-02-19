const Comparer = require('../src/domain/Comparer');
const WinningLotto = require('../src/domain/WinningLotto');

describe('로또번호를 비교한다', () => {
  test('당첨 번호와 일치하는 번호의 갯수를 구한다.', () => {
    // given
    const winningLotto = new WinningLotto([1, 2, 5, 6, 3, 4], 4);
    const lottos = [
      [1, 2, 3, 7, 8, 10],
      [1, 2, 3, 4, 5, 6],
      [9, 10, 11, 12, 13, 14],
    ];
    const comparer = new Comparer(winningLotto, lottos);

    // when
    const result = comparer.countMatchesOfWinningNumber();

    // then
    expect(result).toStrictEqual([3, 6, 0]);
  });

  test('보너스 번호와 일치하는지 확인한다.', () => {
    // given
    const winningLotto = new WinningLotto([15, 24, 3, 10, 12, 6], 7);
    const lottos = [
      [1, 2, 3, 7, 8, 10],
      [1, 2, 3, 4, 5, 6],
      [9, 10, 11, 12, 13, 14],
    ];
    const comparer = new Comparer(winningLotto, lottos);

    // when
    const result = comparer.checkIncludesBonus();

    // then
    expect(result).toStrictEqual([true, false, false]);
  });

  test('각 등수에 맞게 당첨된 로또의 수를 구한다.', () => {
    // given
    const winningLotto = new WinningLotto([1, 5, 6, 2, 3, 4], 10);
    const lottos = [
      [1, 2, 3, 7, 8, 10],
      [1, 2, 3, 4, 5, 6],
      [9, 10, 11, 12, 13, 14],
      [29, 40, 1, 2, 13, 6],
    ];
    const comparer = new Comparer(winningLotto, lottos);

    // when
    const ranking = comparer.getStatistics();

    // then
    expect(ranking).toStrictEqual({ FIFTH: 2, FOURTH: 0, THIRD: 0, SECOND: 0, FIRST: 1 });
  });
});
