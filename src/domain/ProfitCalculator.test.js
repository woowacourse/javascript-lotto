import ProfitCalculator from "./ProfitCalculator.js";

describe("ProfitCalculator 테스트", () => {
  const winningNumbers = [1, 2, 3, 4, 5, 6];

  test("3000원으로 30,000,000원의 수익을 벌면 수익률은 30,000이다.", () => {
    const lottoTickets = [
      [1, 2, 3, 4, 5, 8],
      [11, 12, 13, 14, 15, 16],
      [9, 13, 29, 34, 35, 40],
    ];
    const bonusNumber = 8;

    const profit = new ProfitCalculator(
      lottoTickets,
      winningNumbers,
      bonusNumber
    );

    profit.getResults(); //TODO: getResults()를 호출하지 않으면 결과가 계산되지 않는 문제 해결
    expect(profit.calculateProfitRate()).toBe("1000000.0");
  });
});
