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
    ])("%s(%s)이 포함될 경우 예외 처리한다.", (value) => {
      const numbers = [1, 2, 3, 4, 5, value];

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

    test("로또 번호에 중복된 숫자가 포함될 시 예외 처리를 한다.", () => {
      //Arrange
      const numbers = [1, 2, 3, 4, 5, 5];
      const createWrongLotto = () => new Lotto(numbers);

      //Assert
      expect(createWrongLotto).toThrow();
    });

    test("오름차순으로 로또 번호를 정렬한다.", () => {
      const numbers = [6, 5, 4, 3, 2, 1];
      const expected = [1, 2, 3, 4, 5, 6];

      const lotto = new Lotto(numbers);

      expect(lotto.getNumbers()).toEqual(expected);
    });
  });
});
