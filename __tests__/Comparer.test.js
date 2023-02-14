const Comparer = require('../src/domain/Comparer');

describe('로또번호를 비교한다', () => {
  test('당첨 번호와 일치하는 번호의 갯수를 구한다.', () => {
    // given
    const winningNumber = [1, 2, 3, 4, 5, 6];
    const lottos = [
      [1, 2, 3, 7, 8, 10],
      [1, 2, 3, 4, 5, 6],
      [9, 10, 11, 12, 13, 14],
    ];

    // when
    const comparer = new Comparer(winningNumber, lottos);
    const result = comparer.countMatches();

    // then
    expect(result).toStrictEqual([3, 6, 0]);
  });
});
