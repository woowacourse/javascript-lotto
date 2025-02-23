import LottoGenerator from "../domain/LottoGenerator.js";
import { sortNumber } from "../utils/utils.js";

describe("LottoGenerator 테스트", () => {
  test.each([
    [1000, 1],
    [2000, 2],
    [5000, 5],
    [8000, 8],
    [10000, 10],
  ])("금액 %i원이 입력되면 로또 %i개를 생성한다.", (amount, expectedCount) => {
    const tickets = LottoGenerator.generate(amount);

    expect(tickets.length).toBe(expectedCount);
  });

  test("각 로또 번호는 6개여야 한다.", () => {
    const tickets = LottoGenerator.generate(1000);

    tickets.forEach((ticket) => {
      expect(ticket.length).toBe(6);
    });
  });

  test("각 로또 번호는 1~45 사이의 숫자여야 한다.", () => {
    const tickets = LottoGenerator.generate(1000);

    tickets.forEach((ticket) => {
      ticket.forEach((number) => {
        expect(number).toBeGreaterThanOrEqual(1);
        expect(number).toBeLessThanOrEqual(45);
      });
    });
  });

  test("각 로또 번호는 중복되지 않아야 한다.", () => {
    const tickets = LottoGenerator.generate(1000);

    tickets.forEach((ticket) => {
      const uniqueNumbers = new Set(ticket);
      expect(uniqueNumbers.size).toBe(6);
    });
  });

  test("로또 번호는 오름차순으로 정렬되어야 한다.", () => {
    const tickets = LottoGenerator.generate(1000);

    tickets.forEach((ticket) => {
      const sorted = sortNumber([...ticket]);
      expect(ticket).toEqual(sorted);
    });
  });
});
