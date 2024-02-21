import LottoController from '../src/controller/LottoController';

describe('lottoController 클래스 검사 ', () => {
  test('로또 결과에 따른 총 수익률을 계산하여 반환', () => {
    const lottoController = new LottoController();
    const result = [
      [3, false, 5000, 1],
      [4, false, 50000, 0],
      [5, false, 1500000, 0],
      [5, true, 30000000, 0],
      [6, false, 2000000000, 0],
    ];
    const lottoCount = 8;
    expect(lottoController.getRateOfRevenue(result, lottoCount)).toBe('62.5');
  });
});
