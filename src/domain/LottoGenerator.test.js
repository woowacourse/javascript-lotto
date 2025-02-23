import { sortNumber } from "../utils/utils.js";
import { generateLotto } from "./LottoGenerator.js";
import { SETTINGS } from "../constants/index.js";

describe("LottoGenerator 테스트", () => {
  test.each([
    [1000, 1],
    [2000, 2],
    [5000, 5],
    [8000, 8],
    [10000, 10],
  ])("금액 %i원이 입력되면 로또 %i개를 생성한다.", (amount, expectedCount) => {
    const tickets = generateLotto(amount);

    expect(tickets.length).toBe(expectedCount);
  });

  test("각 로또 번호는 6개여야 한다.", () => {
    const tickets = generateLotto(1000);

    tickets.forEach((ticket) => {
      expect(ticket.length).toBe(SETTINGS.numberCount);
    });
  });

  test("각 로또 번호는 1~45 사이의 숫자여야 한다.", () => {
    const tickets = generateLotto(1000);

    tickets.forEach((ticket) => {
      ticket.forEach((number) => {
        expect(number).toBeGreaterThanOrEqual(SETTINGS.numberRange.min);
        expect(number).toBeLessThanOrEqual(SETTINGS.numberRange.max);
      });
    });
  });

  test("각 로또 번호는 중복되지 않아야 한다.", () => {
    const tickets = generateLotto(1000);

    tickets.forEach((ticket) => {
      const uniqueNumbers = new Set(ticket);
      expect(uniqueNumbers.size).toBe(SETTINGS.numberCount);
    });
  });

  test("로또 번호는 오름차순으로 정렬되어야 한다.", () => {
    const tickets = generateLotto(1000);

    tickets.forEach((ticket) => {
      const sorted = sortNumber([...ticket]);
      expect(ticket).toEqual(sorted);
    });
  });
});
