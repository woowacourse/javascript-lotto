const Validation = require("../src/domain/Validation");

describe("입력 값 유효성 테스트", () => {
  test("구입금액이 1000원 단위가 아니면 에러를 발생시킨다.", () => {
    expect(() => Validation.validateMoney(8800)).toThrow();
  });

  test("당첨 번호의 범위가 1에서 45사이가 아니면 에러를 발생시킨다.", () => {
    expect(() =>
      Validation.validateWinningNumber([1, 2, 3, 4, 5, 99])
    ).toThrow();
  });

  test("당첨 번호의 입력이 6개가 아니면 에러를 발생시킨다.", () => {
    expect(() => Validation.validateWinningNumber([1, 2, 3, 4, 5])).toThrow();
  });

  test("당첨 번호에 중복된 번호가 있으면 에러를 발생시킨다.", () => {
    expect(() =>
      Validation.validateWinningNumber([1, 2, 3, 4, 5, 5])
    ).toThrow();
  });

  test("보너스 번호의 범위가 1에서 45사이가 아니면 에러를 발생시킨다.", () => {
    expect(() =>
      Validation.validateBonusNumber([1, 2, 3, 4, 5, 6], 99)
    ).toThrow();
  });

  test("보너스 번호가 당첨 번호와 중복이 되면 에러를 발생시킨다.", () => {
    expect(() =>
      Validation.validateBonusNumber([1, 2, 3, 4, 5, 6], 6)
    ).toThrow();
  });

  test("재시작 명령어가 y또는 n이 아니면 에러를 발생시킨다.", () => {
    expect(() => Validation.validateRestartCommand("0")).toThrow();
  });
});
