import validateBonusNumber from "../src/domain/validation/validateBonusNumber";

describe("보너스 번호 관련 도메인 검증", () => {
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const validationBonusNumber = validateBonusNumber(winningNumbers);
  test("숫자가 아닌 값이 들어오면 에러가 발생한다.", () => {
    const bonusNumber = "가나다";
    expect(() => validationBonusNumber(bonusNumber)).toThrow();
  });

  test("1~45의 숫자가 아니라면 에러가 발생한다.", () => {
    const bonusNumber = "46";
    expect(() => validationBonusNumber(bonusNumber)).toThrow();
  });
  test("중복된 값이 있으면 에러가 발생한다.", () => {
    const bonusNumber = "4";
    expect(() => validationBonusNumber(bonusNumber)).toThrow();
  });

  test("보너스번호가 들어오면 해당 숫자가 반환된다.", () => {
    const bonusNumber = 7;
    expect(validationBonusNumber(bonusNumber)).toBe(bonusNumber);
  });
});
