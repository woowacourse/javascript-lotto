import WinningLotto from "../src/domain/WinningLotto";

describe("당첨 로또 클래스 기능 테스트", () => {
  const lottoNumbers = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 7;

  test.each([
    { winningNumbers: [10, 11, 12, 13, 14, 15], expectedResult: 0 },
    { winningNumbers: [3, 15, 20, 25, 30, 35], expectedResult: 1 },
    { winningNumbers: [1, 11, 12, 13, 14, 2], expectedResult: 2 },
    { winningNumbers: [3, 5, 6, 10, 11, 12], expectedResult: 3 },
    { winningNumbers: [3, 4, 5, 6, 40, 45], expectedResult: 4 },
    { winningNumbers: [1, 3, 4, 5, 6, 9], expectedResult: 5 },
    { winningNumbers: [1, 2, 3, 4, 5, 6], expectedResult: 6 },
  ])(
    "당첨 번호와 로또 번호가 몇 개 일치하는지 비교한다.",
    ({ winningNumbers, expectedResult }) => {
      const winningLotto = new WinningLotto(winningNumbers, bonusNumber);

      expect(winningLotto.compareWinningNumbersWithLotto(lottoNumbers)).toBe(
        expectedResult,
      );
    },
  );
});

describe("당첨 로또 클래스 생성자 테스트", () => {
  describe("당첨 번호 테스트", () => {
    const bonusNumber = 28;

    test("6개의 번호를 필드로 갖는다", () => {
      const winningLottoNumbers = [1, 2, 3, 4, 5, 6];
      const winningLotto = new WinningLotto(winningLottoNumbers, bonusNumber);

      expect(winningLotto.numbers.length).toBe(6);
    });

    test.each([
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4],
      [1, 2, 3],
      [1, 2],
      [1],
      [],
      [1, 2, 3, 4, 5, 6, 7],
    ])("6개 이외의 개수를 받으면 오류를 발생시킨다.", (...numbers) => {
      expect(() => {
        new WinningLotto(numbers, bonusNumber);
      }).toThrow();
    });

    test.each([
      [1, 2, 3, 4, 5, "6"],
      [1, 2, 3, 4, 5, true],
      [1, 2, 3, 4, 5, {}],
      [1, 2, 3, 4, 5, []],
      [1, 2, 3, 4, 5, undefined],
      [1, 2, 3, 4, 5, null],
    ])(
      "각 로또번호의 타입이 숫자가 아니면 오류를 발생시킨다.",
      (...numbers) => {
        expect(() => {
          new WinningLotto(numbers, bonusNumber);
        }).toThrow();
      },
    );

    test.each([
      [0.1, 0.2, 0.3, 0.4, 0.5, 0.6],
      [1, 2, 3, 4, 5, 6.1],
    ])("모든 로또 번호가 정수가 아니면, 오류를 발생시킨다.", (...numbers) => {
      expect(() => new WinningLotto(numbers, bonusNumber)).toThrow();
    });

    test.each([
      [-1, 1, 2, 3, 4, 5],
      [0, 1, 2, 3, 4, 5],
      [1, 10, 20, 30, 40, 50],
      [1, 10, 20, 30, 40, 46],
    ])(
      "모든 로또 번호가 1 이상 45 이하의 자연수가 아니면, 오류를 발생시킨다.",
      (...numbers) => {
        expect(() => new WinningLotto(numbers, bonusNumber)).toThrow();
      },
    );

    test.each([
      [1, 1, 1, 1, 1, 1],
      [1, 10, 20, 30, 40, 40],
    ])("로또 번호가 중복되는 경우 오류를 발생시킨다.", (...numbers) => {
      expect(() => new WinningLotto(numbers, bonusNumber)).toThrow();
    });
  });

  describe("보너스 번호 테스트", () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];

    test.each(["45", true, undefined, null, {}, []])(
      "보너스 번호의 타입이 Number가 아니면 오류를 발생시킨다.",
      (bonusNumber) => {
        expect(() => {
          new WinningLotto(winningNumbers, bonusNumber);
        }).toThrow();
      },
    );

    test.each([-0.1, 0.5, 33.3])(
      "보너스 번호가 정수가 아니면, 오류를 발생시킨다.",
      (bonusNumber) => {
        expect(() => {
          new WinningLotto(winningNumbers, bonusNumber);
        }).toThrow();
      },
    );

    test.each([-1, 0, 46])(
      "보너스 번호가 1 이상 45 이하가 아니면, 오류를 발생시킨다.",
      (bonusNumber) => {
        expect(() => {
          new WinningLotto(winningNumbers, bonusNumber);
        }).toThrow();
      },
    );

    test.each([1, 2, 3, 4, 5, 6])(
      "당첨 번호와 중복되는 경우 오류를 발생시킨다.",
      (bonusNumber) => {
        expect(() => {
          new WinningLotto(winningNumbers, bonusNumber);
        }).toThrow();
      },
    );
  });
});
