const Comparer = require('../src/domain/Comparer');
const WinningLotto = require('../src/domain/WinningLotto');

test('각 등수에 맞게 당첨된 로또의 수를 구한다.', () => {
  // given
  const winningLotto = new WinningLotto([1, 2, 3, 4, 5, 6], 7);
  const lottos = [
    [1, 2, 3, 7, 8, 10],
    [1, 2, 3, 4, 5, 6],
    [9, 10, 11, 12, 13, 14],
  ];

  // when
  const comparer = new Comparer(winningLotto, lottos);
  const ranking = comparer.getRanking();

  // then
  expect(ranking).toStrictEqual({ FIFTH: 1, FOURTH: 0, THIRD: 0, SECOND: 0, FIRST: 1 });
});
