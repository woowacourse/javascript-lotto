import WinningResultService from '../src/domain/service/WinningResultService.js';

describe('당첨 통계 테스트', () => {
  test('로또들을 인자로 받았을 때, 당첨 개수들을 반환한다.', () => {
    const LOTTOS = [
      [1, 2, 3, 8, 9, 10],
      [1, 2, 3, 4, 9, 10],
      [1, 2, 3, 4, 5, 10],
      [1, 2, 3, 4, 5, 7],
      [1, 2, 3, 5, 6, 7],
      [1, 2, 3, 4, 5, 6],
    ];

    const WINNING_LOTTO = {
      numbers: [1, 2, 3, 4, 5, 6],
      bonusNumber: 7,
    };

    expect(
      new WinningResultService(LOTTOS, WINNING_LOTTO).getWinningResult(),
    ).toEqual({ 3: 1, 4: 1, 5: 1, '5-1': 2, 6: 1 });
  });
});
