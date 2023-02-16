import Lotto from '../src/domain/Lotto.js';

test('getMatchCount', () => {
  const lottoNumbers = [1, 2, 3, 4, 5, 6];
  const lotto = new Lotto(lottoNumbers);

  const winningNumbers = [1, 2, 3, 4, 5, 6];

  const matchCount = lotto.getMatchCount(winningNumbers);

  const expected = 6;

  expect(matchCount).toBe(expected);
});
