import WinningLotto from "../src/domain/WinningLotto";

describe("WinningLotto에 대한 유닛 테스트", () => {
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
});
