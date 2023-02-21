const Benefit = require('../src/domain/model/Benefit');

describe('Benefit class 테스트', () => {
  test('수익률을 계산한 뒤 반환한다.', () => {
    const MONEY = 10000;
    const ranks = [1, 1, 1, 1, 1];
    const benefit = new Benefit();

    benefit.calculateRate(MONEY, ranks);
    const result = benefit.getRate();

    expect(result).toBe(20_315_550);
  });
});
