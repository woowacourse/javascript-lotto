import Validator from "../src/utils/Validator";

describe("구매 금액 테스트", () => {
  test("구매 금액이 1,000원 단위가 아니면 에러 발생", () => {
    const price = 1500;
    expect(function () {
      Validator.validatePrice(price);
    }).toThrow("[ERROR]");
  });

  test("당첨 번호 범위(1~45) 테스트", () => {
    const winningNum = [1, 2, 3, 4, 5, 50];
    expect(function () {
      winningNum.forEach((num) => Validator.validateLottoNumRange(num));
    }).toThrow("[ERROR]");
  });

  test("보너스번호 범위(1~45) 태스트", () => {
    const bonusNum = 50;
    expect(function () {
      Validator.validateLottoNumRange(bonusNum);
    }).toThrow("[ERROR]");
  });

  test("당첨번호가 중복되지 않는 수로 구성됐는지 테스트", () => {
    const winningNum = [1, 2, 3, 4, 5, 5];
    expect(function () {
      Validator.validateDuplicateLottoNums(winningNum);
    }).toThrow("[ERROR]");
  });

  test("보너스 번호에 당첨번호와 중복된 숫자가 있으면 예외가 발생한다.", () => {
    const winningNum = [1, 2, 3, 4, 5, 6];
    const bonusNum = 6;
    expect(function () {
      Validator.validateDuplicateBonusNum(winningNum, bonusNum);
    }).toThrow("[ERROR]");
  });

  test("로또 번호의 개수가 6개가 아니면 에러를 발생한다.", () => {
    const winningNum = [1, 2, 3, 4, 5, 6, 7];
    expect(function () {
      Validator.validateLottoCount(winningNum);
    }).toThrow("[ERROR]");
  });

  test("재시도 입력값이 y나 n이 아니면 에러가 발생한다.", () => {
    const restartAnswer = "예";
    expect(function () {
      Validator.validateRestartAnswer(restartAnswer);
    }).toThrow("[ERROR]");
  });
});
