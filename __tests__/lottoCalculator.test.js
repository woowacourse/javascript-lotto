import LottoCalculator from '../src/domain/LottoCalculator';

describe('로또 수익 계산기 클래스 테스트', () => {
  test('로또 수익을 잘 계산해서 반환하는지 판단한다1.', () => {
    const lottoCalculator = new LottoCalculator();
    const lottoWinResult = [0, 0, 0, 0, 1];
    const lottosCount = 5;
    expect(lottoCalculator.getRateOfRevenue(lottoWinResult, lottosCount)).toBe('100.0');
  });

  test('로또 수익을 잘 계산해서 반환하는지 판단한다2.', () => {
    const lottoCalculator = new LottoCalculator();
    const lottoWinResult = [0, 0, 0, 0, 1];
    const lottosCount = 8;
    expect(lottoCalculator.getRateOfRevenue(lottoWinResult, lottosCount)).toBe('62.5');
  });
});
