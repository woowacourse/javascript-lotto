import Lotto from "../src/domain/Lotto";
import WinningLotto from "../src/domain/WinningLotto";

describe("WinningLotto에 대한 유닛 테스트", () => {
  test("Lotto 배열을 입력받아 각 로또의 등수가 배열을 반환한다", () => {
    const lottoNumbers1 = [1, 2, 3, 4, 5, 6];
    const lottoNumbers2 = [1, 2, 3, 4, 40, 42];

    const winningNumbers = [1, 2, 3, 4, 40, 41];
    const bonusNumber = 42;

    const lotto1 = new Lotto(lottoNumbers1);
    const lotto2 = new Lotto(lottoNumbers2);
    const winningLotto = new WinningLotto(winningNumbers, bonusNumber);

    expect(winningLotto.getLottosRanks([lotto1, lotto2])).toEqual([4, 2]);
  });

  test.each([[[1, 2, 3, 4, 5]], [[1, 2, 3, 4, 5, 6, 7]]])(
    "당첨 번호의 개수가 6개가 아니면 예외 처리를 한다.",
    (numbers) => {
      const bonusNumber = 8;
      const createWrongWinningLotto = () =>
        new WinningLotto(numbers, bonusNumber);

      //Assert
      expect(createWrongWinningLotto).toThrow();
    }
  );

  test.each([
    ["1", "string"],
    [0.1, "decimal"],
    [-1, "negative int"],
    [true, "boolean"],
    [null, "null"],
    [undefined, "undefined"],
    [Symbol(1), "symbol"],
    [BigInt(1), "BigInt"],
    [{}, "object"],
  ])("당첨 번호에 %s(%s)이 포함될 경우 예외 처리한다.", (value) => {
    const numbers = [1, 2, 3, 4, 5, value];
    const bonusNumber = 7;
    const createWrongWinningLotto = () =>
      new WinningLotto(numbers, bonusNumber);

    //Assert
    expect(createWrongWinningLotto).toThrow();
  });

  test.each([
    ["1", "string"],
    [0.1, "decimal"],
    [-1, "negative int"],
    [true, "boolean"],
    [null, "null"],
    [undefined, "undefined"],
    [Symbol(1), "symbol"],
    [BigInt(1), "BigInt"],
    [{}, "object"],
  ])(
    "보너스 번호에 %s(%s)이 포함될 경우 예외 처리한다.",
    (wrongBonusNumber) => {
      const numbers = [1, 2, 3, 4, 5, 6];

      const createWrongWinningLotto = () =>
        new WinningLotto(numbers, wrongBonusNumber);

      //Assert
      expect(createWrongWinningLotto).toThrow();
    }
  );

  test.each([0, 46])(
    "당첨 번호는 1 ~ 45 사이의 정수가 아니면 예외 처리를 한다.",
    (number) => {
      const wrongNumbers = [1, 2, 3, 4, 5, number];
      const bonusNumber = 6;

      const createWrongWinningLotto = () =>
        new WinningLotto(wrongNumbers, bonusNumber);

      //Assert
      expect(createWrongWinningLotto).toThrow();
    }
  );

  test.each([0, 46])(
    "당첨 번호는 1 ~ 45 사이의 정수가 아니면 예외 처리를 한다.",
    (number) => {
      const numbers = [1, 2, 3, 4, 5, 6];
      const wrongBonus = number;

      const createWrongWinningLotto = () =>
        new WinningLotto(numbers, wrongBonus);

      //Assert
      expect(createWrongWinningLotto).toThrow();
    }
  );

  test.each([
    [[1, 2, 3, 4, 5, 6], 1],
    [[1, 1, 2, 3, 4, 5], 7],
    [[1, 1, 2, 3, 4, 5], 1],
  ])(
    "모든 번호(당첨 번호 및 보너스 번호) 중 중복이 존재할 경우 예외 처리를 한다.",
    (numbers, bonusNumber) => {
      const createWrongWinningLotto = () =>
        new WinningLotto(numbers, bonusNumber);

      //Assert
      expect(createWrongWinningLotto).toThrow();
    }
  );
});
