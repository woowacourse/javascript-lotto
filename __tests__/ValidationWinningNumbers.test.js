import Validation from "../src/utils/validation/Validation";

describe("당첨 번호 관련 도메인 검증", () => {
  test("숫자와 구분자(,)로 이루어진 값이 아니라면 에러가 발생한다.", () => {
    const winningNumbers = "가나다";
    expect(() => Validation.winningNumbers(winningNumbers)).toThrow();
  });
  test("6개의 값이 아니라면 에러가 발생한다.", () => {
    const winningNumbers = "1,2,3";
    expect(() => Validation.winningNumbers(winningNumbers)).toThrow();
  });
  test("6개의 값이 모두 숫자가 아니라면 에러가 발생한다.", () => {
    const winningNumbers = "1,2,3,다,나,가";
    expect(() => Validation.winningNumbers(winningNumbers)).toThrow();
  });
  test("1~45의 숫자가 아니라면 에러가 발생한다.", () => {
    const winningNumbers = "1,2,3,4,23,46";
    expect(() => Validation.winningNumbers(winningNumbers)).toThrow();
  });
  test("중복된 값이 있으면 에러가 발생한다.", () => {
    const winningNumbers = "1,2,3,4,4,4";
    expect(() => Validation.winningNumbers(winningNumbers)).toThrow();
  });
});
