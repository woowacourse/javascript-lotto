import { winningStatistics } from '../model/winningStatistics';
import { money } from '../model/money';

describe('당첨 통계 테스트', () => {
  test('당첨 통계를 초기화한다.', () => {
    winningStatistics.store.matchThreeNumbers = 41;
    winningStatistics.store.matchFourNumbers = 13;
    winningStatistics.store.matchFiveNumbers = 232;
    winningStatistics.store.matchFiveNumbersAndBonusBall = 42;
    winningStatistics.store.matchSixNumbers = 12;

    winningStatistics.initializeLottoRank();

    expect(winningStatistics.store.matchThreeNumbers).toBe(0);
    expect(winningStatistics.store.matchFourNumbers).toBe(0);
    expect(winningStatistics.store.matchFiveNumbers).toBe(0);
    expect(winningStatistics.store.matchFiveNumbersAndBonusBall).toBe(0);
    expect(winningStatistics.store.matchSixNumbers).toBe(0);
  });

  test('수익률을 계산한다.', () => {
    winningStatistics.store.matchThreeNumbers = 1;
    money.userInput = 1000;
    expect(winningStatistics.getProfitRate()).toBe(400);

    winningStatistics.initializeLottoRank();

    winningStatistics.store.matchFourNumbers = 1;
    expect(winningStatistics.getProfitRate()).toBe(4900);
  });
});
