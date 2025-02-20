import Validator from "../src/Validator/validator.js";

describe("구입금액", () => {
  test("구입 금액이 문자인 경우에 예외 처리한다.", () => {
    const input = Number("천원");

    expect(() => Validator.validatePurchaseMoney(input)).toThrow(
      "[ERROR] 구입 금액은 숫자로 입력해야 합니다.",
    );
  });

  test("구입 금액이 소수인 경우에 예외 처리한다.", () => {
    const input = Number("1000.5");

    expect(() => Validator.validatePurchaseMoney(input)).toThrow(
      "[ERROR] 구입 금액은 정수로 입력해야 합니다.",
    );
  });

  test("구입 금액이 소수인 경우에 예외 처리한다.", () => {
    const input = Number("");

    expect(() => Validator.validatePurchaseMoney(input)).toThrow(
      "[ERROR] 구입 금액은 양수로 입력해야 합니다.",
    );
  });

  test("구입 금액이 양수가 아닌 경우에 예외 처리한다.", () => {
    const input = Number("-1000");

    expect(() => Validator.validatePurchaseMoney(input)).toThrow(
      "[ERROR] 구입 금액은 양수로 입력해야 합니다.",
    );
  });

  test("구입 금액이 1000으로 나누어 떨어지지 않는 경우에 예외 처리한다.", () => {
    const input = Number("1234");

    expect(() => Validator.validatePurchaseMoney(input)).toThrow(
      "[ERROR] 구입 금액은 1000원 단위로 입력해야 합니다.",
    );
  });
});

describe("당첨번호", () => {
  test("당첨번호가 중복인 경우에 예외 처리한다.", () => {
    const input = "1,2,2,3,4,5";
    const strings = input.split(",").map((string) => Number(string));

    expect(() => Validator.validateWinningNumbers(strings)).toThrow(
      "[ERROR] 당첨번호는 중복없이 입력해야 합니다.",
    );
  });

  test("당첨번호가 문자인 경우에 예외 처리한다.", () => {
    const input = "a,b,c";
    const strings = input.split(",").map((string) => Number(string));

    expect(() => Validator.validateWinningNumbers(strings)).toThrow(
      "[ERROR] 당첨번호는 숫자로 입력해야 합니다.",
    );
  });

  test("당첨번호가 소수인 경우에 예외 처리한다.", () => {
    const input = "1.2,2.3,3.4";
    const strings = input.split(",").map((string) => Number(string));

    expect(() => Validator.validateWinningNumbers(strings)).toThrow(
      "[ERROR] 당첨번호는 정수로 입력해야 합니다.",
    );
  });

  test("당첨번호가 소수인 경우에 예외 처리한다.", () => {
    const input = ",,3";
    const strings = input.split(",").map((string) => Number(string));

    expect(() => Validator.validateWinningNumbers(strings)).toThrow(
      "[ERROR] 당첨번호는 1 ~ 45 사이의 숫자로 입력해야 합니다.",
    );
  });

  test("당첨번호가 6개가 아닌 경우 예외 처리한다.", () => {
    const input = "1,2,3,4,5";
    const strings = input.split(",").map((string) => Number(string));

    expect(() => Validator.validateWinningNumbers(strings)).toThrow(
      "[ERROR] 당첨번호는 6개를 입력해야 합니다.",
    );
  });

  test("당첨번호가 1 ~ 45 사이의 숫자가 아닌 경우 예외 처리한다.", () => {
    const input = "1,2,3,4,5,50";
    const strings = input.split(",").map((string) => Number(string));

    expect(() => Validator.validateWinningNumbers(strings)).toThrow(
      "[ERROR] 당첨번호는 1 ~ 45 사이의 숫자로 입력해야 합니다.",
    );
  });
});

describe("보너스번호", () => {
  const winningNumbers = [1, 2, 3, 4, 5, 6];

  test("보너스번호가 문자인 경우에 예외 처리한다.", () => {
    const input = Number("일");

    expect(() => Validator.validateBonusNumber(winningNumbers, input)).toThrow(
      "[ERROR] 보너스번호는 숫자로 입력해야 합니다.",
    );
  });

  test("보너스번호가 소수인 경우에 예외 처리한다.", () => {
    const input = Number("1.2");

    expect(() => Validator.validateBonusNumber(winningNumbers, input)).toThrow(
      "[ERROR] 보너스번호는 정수로 입력해야 합니다.",
    );
  });

  test("보너스번호가 소수인 경우에 예외 처리한다.", () => {
    const input = Number("");

    expect(() => Validator.validateBonusNumber(winningNumbers, input)).toThrow(
      "[ERROR] 보너스번호는 1 ~ 45 사이의 숫자로 입력해야 합니다.",
    );
  });

  test("보너스번호가 소수인 경우에 예외 처리한다.", () => {
    const input = Number("50");

    expect(() => Validator.validateBonusNumber(winningNumbers, input)).toThrow(
      "[ERROR] 보너스번호는 1 ~ 45 사이의 숫자로 입력해야 합니다.",
    );
  });

  test("보너스번호가 소수인 경우에 예외 처리한다.", () => {
    const input = Number("1");

    expect(() => Validator.validateBonusNumber(winningNumbers, input)).toThrow(
      "[ERROR] 보너스번호는 당첨번호와 중복없이 입력해야 합니다.",
    );
  });
});
