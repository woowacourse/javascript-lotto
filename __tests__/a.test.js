import Lotto from "../src/domain/Lotto";

describe("로또에 대한 유닛 테스트", () => {
  describe("로또 번호 유효성 검증", () => {
    test("로또 번호는 6개 미만이면 예외 처리를 한다.", () => {
      //Arrange
      const numbers = [1, 2, 3, 4, 5];
      const createWrongLotto = () => new Lotto(numbers);

      //Assert
      expect(createWrongLotto).toThrow();
    });

    test.each([0, 46])(
      "로또 번호는 1 ~ 45 사이의 정수가 아니면 예외 처리를 한다.",
      (number) => {
        //Arrange
        const numbers = [1, 2, 3, 4, 5, number];

        const createWrongLotto = () => new Lotto(numbers);

        //Assert
        expect(createWrongLotto).toThrow();
      }
    );
  });
});
