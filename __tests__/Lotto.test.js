import { ErrorMessage } from "../src/constants/Constants.js";
import Lotto from "../src/domain/Lotto.js";

describe("사용자 로또 클래스 테스트", () => {
  test("로또 번호 갯수가 6개가 아닐 때 에러가 발생한다.", () => {
    const NUMBERS = [
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5, 6, 7],
    ];

    NUMBERS.forEach((numbers) => {
      expect(() => new Lotto(numbers)).toThrow(ErrorMessage.LOTTO_LENGTH);
    });
  });

  test("외부에서 로또 번호를 넘겨주면 클래스에 로또 번호가 저장된다.", () => {
    const NUMBERS = [
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12],
    ];

    NUMBERS.forEach((numbers) => {
      const lotto = new Lotto(numbers);

      expect(lotto.getNumbers()).toEqual(numbers);
    });
  });

  test("로또 번호들이 1~45 사이의 숫자가 아니면 에러가 발생한다.", () => {
    const NUMBERS = [
      [1, 2, 65, 4, 5, 6],
      [100, 110, 120, 130, 140, 150],
    ];

    NUMBERS.forEach((numbers) => {
      expect(() => new Lotto(numbers)).toThrow(ErrorMessage.LOTTO_VALUE);
    });
  });

  test("로또 번호가 중복되면 에러가 발생한다.", () => {
    const NUMBERS = [
      [1, 1, 2, 3, 4, 5],
      [5, 2, 2, 6, 9, 9],
    ];

    NUMBERS.forEach((numbers) => {
      expect(() => new Lotto(numbers)).toThrow(ErrorMessage.LOTTO_DUPLICATE);
    });
  });

  test("사용자 로또 번호는 정렬되어 있다.", () => {
    const NUMBERS = [
      [14, 2, 6, 31, 8, 45],
      [21, 7, 43, 38, 1, 2],
    ];
    const EXPECTED = [
      [2, 6, 8, 14, 31, 45],
      [1, 2, 7, 21, 38, 43],
    ];

    NUMBERS.forEach((numbers, index) => {
      const lotto = new Lotto(numbers);

      expect(lotto.getNumbers()).toEqual(EXPECTED[index]);
    });
  });
});
