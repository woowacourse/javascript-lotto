import Winnings from "../src/domain/Winnings.js";

describe("Winnings 클래스 테스트", () => {
  test("당첨번호 저장", () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;
    const winnings = new Winnings(numbers, bonusNumber);

    expect(winnings.numbers).toEqual(numbers);
    expect(winnings.bonusNumber).toBe(bonusNumber);
  });

  test("당첨번호는 중복되지 않아야함", () => {
    expect(() => {
      const numbers = [1, 2, 3, 4, 5, 5];
      const bonusNumber = 6;
      const winnings = new Winnings(numbers, bonusNumber);
    }).toThrow();
  });

  test.each([[[0, 1, 2, 3, 4, 5]], [[1, 2, 3, 4, 5, 46]]])(
    "당첨번호는 1~45 사이의 자연수들로 구성된 숫자 배열이어야함",
    (numbers) => {
      const bonusNumber = 10;
      expect(() => {
        const winnings = new Winnings(numbers, bonusNumber);
      }).toThrow();
    }
  );

  test("당첨번호와 보너스 번호는 중복되면 안됨", () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 1;

    expect(() => {
      const winnings = new Winnings(numbers, bonusNumber);
    }).toThrow();
  });

  test("당첨번호는 자연수로 구성되어야 함", () => {
    const numbers = [1.2, 3, 1.7, 4, 6, 7];
    const bonusNumber = 10;

    expect(() => {
      const winnings = new Winnings(numbers, bonusNumber);
    }).toThrow();
  });

  test("보너스 넘버는 자연수로 구성되어야 함", () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 1.3;

    expect(() => {
      const winnings = new Winnings(numbers, bonusNumber);
    }).toThrow();
  });

  test("보너스 넘버는 1~45 사이의 숫자여야함", () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 46;

    expect(() => {
      const winnings = new Winnings(numbers, bonusNumber);
    }).toThrow();
  });

  test("당첨개수 카운트", () => {
    const lottos = [
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 7],
    ];
    const numbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    const winnings = new Winnings(numbers, bonusNumber);

    const statistics = winnings.countStatistics(lottos);

    expect(statistics).toEqual({
      3: 0,
      4: 0,
      5: 0,
      6: 1,
      7: 1,
    });
  });

  test("수익률 계산", () => {
    const lottos = [
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 7],
    ];
    const numbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    const money = 2000;

    const winnings = new Winnings(numbers, bonusNumber);

    const statistics = winnings.countStatistics(lottos);
    const winningRate = winnings.calculateWinningRate(statistics, money);

    expect(winningRate).toBe(((30000000 + 2000000000) / money) * 100);
  });
});

// 수익률
