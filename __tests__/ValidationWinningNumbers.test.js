import validateWinningNumbers from "../src/domain/validation/validateWinningNumbers";

describe("당첨 번호 관련 도메인 검증", () => {
  test("숫자와 구분자(,)로 이루어진 값이 아니라면 에러가 발생한다.", () => {
    const winningNumbers = "가나다";
    expect(() => validateWinningNumbers(winningNumbers)).toThrow();
  });
  test("6개의 값이 아니라면 에러가 발생한다.", () => {
    const winningNumbers = "1,2,3";
    expect(() => validateWinningNumbers(winningNumbers)).toThrow();
  });
  test("6개의 값이 모두 숫자가 아니라면 에러가 발생한다.", () => {
    const winningNumbers = "1,2,3,다,나,가";
    expect(() => validateWinningNumbers(winningNumbers)).toThrow();
  });
  test("1~45의 숫자가 아니라면 에러가 발생한다.", () => {
    const winningNumbers = "1,2,3,4,23,46";
    expect(() => validateWinningNumbers(winningNumbers)).toThrow();
  });
  test("중복된 값이 있으면 에러가 발생한다.", () => {
    const winningNumbers = "1,2,3,4,4,4";
    expect(() => validateWinningNumbers(winningNumbers)).toThrow();
  });

  test("당첨번호가 들어오면 당첨번호 배열이 반환된다.", () => {
    const winningNumbers = "1,2,3,4,5,6";
    const expectWinningNumbers = [1, 2, 3, 4, 5, 6];
    expect(validateWinningNumbers(winningNumbers)).toEqual(expectWinningNumbers);
  });
});
