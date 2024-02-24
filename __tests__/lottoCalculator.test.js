import LottoCalculator from '../src/domain/LottoCalculator';

describe('로또 수익 계산기 클래스 테스트', () => {
  test('로또 수익을 잘 계산해서 반환하는지 판단한다1.', () => {
    const lottoCalculator = new LottoCalculator();
    const lottoWinResult = [0, 1, 0, 0, 0];
    const lottosCount = 2;
    expect(lottoCalculator.getRateOfRevenue(lottoWinResult, lottosCount)).toBe('1500000.0');
  });

  test('로또 수익을 잘 계산해서 반환하는지 판단한다2.', () => {
    const lottoCalculator = new LottoCalculator();
    const lottoWinResult = [1, 0, 0, 0, 0];
    const lottosCount = 100;
    expect(lottoCalculator.getRateOfRevenue(lottoWinResult, lottosCount)).toBe('2000000.0');
  });
});
