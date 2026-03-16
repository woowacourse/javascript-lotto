import Lotto from "../../../src/domain/Lotto.js";

describe("Lotto 생성 성공테스트", () => {
  test("로또번호 성공 테스트", () => {
    const valid = [1, 2, 3, 4, 5, 6];
    expect(new Lotto(valid)).toBeInstanceOf(Lotto);
  });
});

describe("Lotto 유효성검사 테스트", () => {
  test("로또 번호는 중복 될 수 없다", () => {
    const inValid = [1, 1, 3, 4, 5, 6];
    expect(() => Lotto.validate(inValid)).toThrow(Lotto.ERROR.DUPLICATE);
  });

  test.each([[[0, 2, 3, 4, 5, 6]], [[1, 2, 3, 4, 5, 46]]])(
    "로또 번호는 1~45 범위여야한다 %s",
    (numbers) => {
      expect(() => Lotto.validate(numbers)).toThrow(Lotto.ERROR.INVALID_RANGE);
    },
  );

  test.each([[[2, 3, 4, 5, 6]], [[1, 2, 3, 4, 5, 6, 7]]])(
    "로또 개수는 6개여야한다",
    (numbers) => {
      expect(() => Lotto.validate(numbers)).toThrow(Lotto.ERROR.INVALID_SIZE);
    },
  );
});

describe("Lotto 메서드 테스트", () => {
  const numbers = [1, 2, 3, 4, 5, 6];
  const lotto = new Lotto(numbers);
  test("숫자를 받고 자기가 가진 숫자와 겹치는지 확인할 수 있다", () => {
    expect(lotto.hasNumber(1)).toBe(true);
    expect(lotto.hasNumber(7)).toBe(false);
  });

  test("Lotto의 숫자를 반환", () => {
    const testCase = [1, 2, 3, 4, 5, 6];
    expect(lotto.getNumbers()).toEqual(testCase);
  });
});
