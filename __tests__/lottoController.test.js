import LottoController from '../src/controller/LottoController';

describe.skip('lottoController 클래스 검사 ', () => {
  test.each([
    [[1, 0, 0, 0, 0], 8, '62.5'],
    [[0, 0, 0, 1, 0], 30, '100000.0'],
  ])('로또 결과에 따른 총 수익률을 계산하여 반환', (winResult, lottoCount, revenue) => {
    const lottoController = new LottoController();

    const result = [
      [3, false, 5_000, winResult[0]],
      [4, false, 50_000, winResult[1]],
      [5, false, 150_0000, winResult[2]],
      [5, true, 30_000_000, winResult[3]],
      [6, false, 2_000_000_000, winResult[4]],
    ];

    expect(lottoController.getRateOfRevenue(result, lottoCount)).toBe(revenue);
  });
});
