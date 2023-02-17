import LottoGame from '../src/domain/LottoGame.js';

describe('거스름돈 계산하기', () => {
  test('구입 금액 8700인 경우', () => {
    expect(LottoGame.calculateTheChange(8700)).toBe(700);
  });

  test('구입 금액 8000인 경우', () => {
    expect(LottoGame.calculateTheChange(8000)).toBe(0);
  });
});
