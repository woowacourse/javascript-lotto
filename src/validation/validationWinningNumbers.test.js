import { validationWinningNumbers } from "./validationWinningNumbers.js";

describe("validationWinningNumbers 유효성 검사", () => {
  test("당첨 번호의 개수가 6개가 아니면 에러가 발생한다.", () => {
    const numbers = [1, 2, 3, 4, 5];
    expect(() => validationWinningNumbers(numbers)).toThrow();
  });

  test("당첨 번호에 중복이 있는 경우 에러가 발생한다.", () => {
    const numbers = [1, 2, 3, 4, 5, 5];
    expect(() => validationWinningNumbers(numbers)).toThrow();
  });

  test("당첨 번호에 정수가 아닌 숫자가 있으면 에러가 발생한다..", () => {
    const numbers = [1, 2, 3, 4, 5, 5.5];
    expect(() => validationWinningNumbers(numbers)).toThrow();
  });

  test.each([[[0, 2, 3, 4, 5, 6]], [[1, 2, 3, 4, 5, 46]]])(
    "당첨 번호의 숫자가 1 ~ 45에 포함되지 않으면 에러가 발생한다.",
    (number) => {
      expect(() => validationWinningNumbers(number)).toThrow();
    }
  );
});
