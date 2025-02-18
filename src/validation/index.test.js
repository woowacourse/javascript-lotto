import {
  validationLottoPrice,
  validationWinningNumbers,
  validationBonusNumber,
  validationRestartInput,
} from "./index.js";

describe("validationLottoPrice 유효성 검사", () => {
  test("1000.1원은 정수가 아니다.", () => {
    const price = 1000.1;
    expect(() => validationLottoPrice(price)).toThrow();
  });

  test("5001원은 1000원 단위로 나눠지지 않는다.", () => {
    const price = 5001;
    expect(() => validationLottoPrice(price)).toThrow();
  });

  test("999원은 최소 구입 금액(1000원)보다 작다.", () => {
    const price = 999;
    expect(() => validationLottoPrice(price)).toThrow();
  });

  test("101,000원은 최대 구입 금액(10만원)을 초과한다.", () => {
    const price = 101_000;
    expect(() => validationLottoPrice(price)).toThrow();
  });
});

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

describe("validationBonusNumber 유효성 검사", () => {
  test("보너스 번호가 정수가 아니면 에러가 발생한다.", () => {
    const bonusNumber = 1.5;
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    expect(() => validationBonusNumber(bonusNumber, winningNumbers)).toThrow();
  });

  test.each([[0], [46]])(
    "보너스 번호가 1 ~ 45에 포함되지 않으면 에러가 발생한다.",
    (number) => {
      const winningNumbers = [2, 3, 4, 5, 6, 7];
      expect(() => validationBonusNumber(number, winningNumbers)).toThrow();
    }
  );
});

describe("validationRestartInput 유효성 검사", () => {
  test("재시작 입력에 Y또는 N이 아니면 에러가 발생한다.", () => {
    expect(() => validationRestartInput("A")).toThrow();
  });
});
