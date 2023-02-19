import LottoUtils from '../src/domain/LottoUtils';

test('수익률 계산', () => {
  const winningResult = { first: 0, second: 0, third: 1, fourth: 1, fifth: 0 };
  LottoUtils.calculateYieldRate([1, 2, 3, 4, 5, 6], 7);

  expect(LottoUtils.calculateYieldRate(winningResult, 20)).toBe('7750.0');
});
