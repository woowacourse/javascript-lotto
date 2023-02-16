import Lotto from '../src/domain/Lotto.js';

test('getMatchCount메서드 실행 시 일치하는 번호의 갯수를 반환한다.', () => {
  const lottoNumbers = [1, 2, 3, 4, 5, 6];
  const lotto = new Lotto(lottoNumbers);

  const winningNumbers = [1, 2, 3, 4, 5, 6];

  const matchCount = lotto.getMatchCount(winningNumbers);

  const expected = 6;

  expect(matchCount).toBe(expected);
});
