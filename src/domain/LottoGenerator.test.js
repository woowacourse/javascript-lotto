import LottoGenerator from "../domain/LottoGenerator.js";
import { sortNumber } from "../utils/utils.js";

describe("LottoGenerator 테스트", () => {
  test("입력된 금액에 따라 올바른 개수의 로또를 생성해야 한다", () => {
    const amount = 8000;
    const tickets = LottoGenerator.generate(amount);

    expect(tickets.length).toBe(8);
  });

  test("각 로또 번호는 6개여야 한다", () => {
    const tickets = LottoGenerator.generate(1000);

    tickets.forEach((ticket) => {
      expect(ticket.length).toBe(6);
    });
  });

  test("각 로또 번호는 1~45 사이의 숫자여야 한다", () => {
    const tickets = LottoGenerator.generate(1000);

    tickets.forEach((ticket) => {
      ticket.forEach((number) => {
        expect(number).toBeGreaterThanOrEqual(1);
        expect(number).toBeLessThanOrEqual(45);
      });
    });
  });

  test("각 로또 번호는 중복되지 않아야 한다", () => {
    const tickets = LottoGenerator.generate(1000);

    tickets.forEach((ticket) => {
      const uniqueNumbers = new Set(ticket);
      expect(uniqueNumbers.size).toBe(6);
    });
  });

  test("로또 번호는 오름차순으로 정렬되어야 한다", () => {
    const tickets = LottoGenerator.generate(1000);

    tickets.forEach((ticket) => {
      const sorted = sortNumber([...ticket]);
      expect(ticket).toEqual(sorted);
    });
  });
});
