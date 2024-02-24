import LottoController from '../src/controller/LottoController';

describe('lottoController 클래스 내 수익률을 계산하는 함수를 검사하는 테스트입니다.', () => {
  test.each([
    // 각 배열의 첫 번째 항목을 테스트 설명으로 사용
    ['5등 1회 당첨, 나머지 등수 미당첨 시 수익률 62.5%입니다', [1, 0, 0, 0, 0], 8, '62.5'],
    ['1등(보너스 번호 포함) 1회 당첨 시 수익률 100000.0%입니다', [0, 0, 0, 1, 0], 30, '100000.0'],
  ])('%s', (description, winResult, lottoCount, revenue) => {
    // description을 테스트 이름으로 포함
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
