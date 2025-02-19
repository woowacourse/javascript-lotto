import Validator from "../src/Validator.js";

describe("유효성 테스트", () => {
  test("금액은 1,000원으로 나누어 떨어져야 한다. ", () => {
    const moneyString = "10001";

    expect(() => {
      Validator.isPrice(moneyString);
    }).toThrow();
  });

  test("금액은 숫자를 입력으로 받아야 한다.", () => {
    const priceString = "asdf";

    expect(() => {
      Validator.isPrice(priceString);
    }).toThrow();
  });

  test("로또숫자는 랜덤하고 중복되지 않는 6개 로또숫자여야한다.", () => {
    const lotto = [1, 2, 3, 4, 5, 5];

    expect(() => {
      Validator.isUniqueLotto(lotto);
    }).toThrow();
  });

  test("로또는 오름차순으로 정렬되어야 한다.", () => {
    const lotto = [3, 1, 2, 3, 4, 5];

    expect(() => {
      Validator.isUphillList(lotto);
    }).toThrow();
  });

  test("당첨번호는 쉼표로 구분되어야 한다.", () => {
    const tartgetNumer = "1,2,3,4.5,6";
    expect(() => {
      Validator.isTargetNumber(tartgetNumer);
    }).toThrow();
  });

  test("당첨번호의 갯수는 6개여야한다.", () => {
    const tartgetNumer = "1,2,3,4,5";
    expect(() => {
      Validator.isTargetNumber(tartgetNumer);
    }).toThrow();
  });

  test("당첨번호의 범위는 1~45이어야한다.", () => {
    const targetNumer = "1,2,3,4,5,49";
    expect(() => {
      Validator.isTargetNumber(targetNumer);
    }).toThrow();
  });

  test("보너스 번호는 숫자이어야 한다.", () => {
    const bonusNumberString = "asdf";
    expect(() => {
      Validator.isBonusNumber(bonusNumberString);
    }).toThrow();
  });

  test("보너스 번호는 1~45이어야 한다.", () => {
    const bonusNumberString = "46";
    expect(() => {
      Validator.isBonusNumber(bonusNumberString);
    }).toThrow();
  });

  test("다시 시작하기 위한 입력은 y또는 n이어야 한다.", () => {
    const restartString = "yes";
    expect(() => {
      Validator.isRestartString(restartString);
    }).toThrow();
  });
});
