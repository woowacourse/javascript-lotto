import Validator from "../src/utils/Validator";

describe("공통 () => Validator 단위 테스트", () => {
  test("입력값이 숫자인지 판별하는 함수 테스트", () => {
    const input = "aiden";

    expect(() => Validator.isNumber(input)).toThrow();
  });

  test("입력값이 양의 정수인지 판별하는 함수 테스트(음수)", () => {
    const input = -2000;

    expect(() => Validator.isPositiveInteger(input)).toThrow();
  });

  test("입력값이 양의 정수인지 판별하는 함수 테스트(소수)", () => {
    const input = 1.3;

    expect(() => Validator.isPositiveInteger(input)).toThrow();
  });
});

describe("구매금액 () => Validator 단위 테스트", () => {
  test("구입금액이 1000으로 나누어 떨어지는지 판별하는 함수 테스트", () => {
    const buyMoney = 200;

    expect(() => Validator.isDividedByThousand(buyMoney)).toThrow();
  });
});

describe("당첨번호와 보너스번호 () => Validator 단위 테스트", () => {
  test("당첨번호와 보너스번호가 1~45의 범위인지 판별하는 함수 테스트", () => {
    const input = 0;

    expect(() => Validator.isCorrectRange(input)).toThrow();
  });

  test("당첨번호에 중복인 숫자가 있는지 확인하는 함수 테스트", () => {
    const winningLotto = [1, 1, 2, 3, 4, 5];

    expect(() => Validator.isDuplicatedNumber(winningLotto)).toThrow();
  });
});

describe("보너스 번호 () => Validator 단위 테스트", () => {
  test("보너스 번호가 중복된 숫자인지 판별하는 함수 테스트", () => {
    const winningLotto = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 3;
    expect(() => Validator.hasBonusNumber(bonusNumber, winningLotto)).toBeTruthy();
  });
});

describe("재시작 입력 () => Validator 단위 테스트", () => {
  test("재시작 여부 입력이 y/n이 아닌지 판별하는 함수 테스트", () => {
    const retryInput = "A";
    expect(() => Validator.isCorrectRetryInput(retryInput)).toThrow();
  });
});
