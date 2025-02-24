import { LOTTO } from "../src/config/const.js";
import Validate from "../src/utils/validate/Validate.js";

let validate;
beforeEach(() => {
  validate = new Validate();
});

test(`구입급액이 ${LOTTO.PURCHASE.unit}원 단위가 아닐 경우 예외를 발생시킨다.`, () => {
  const price = 1500;

  expect(() => validate.purchaseUnit(price)).toThrow(
    "구입 금액은 1000원 단위로 입력해주세요."
  );
});

test("구입금액이 숫자가 아닐 경우 예외를 발생시킨다.", () => {
  const price = "aa";

  expect(() => validate.isNumeric(price)).toThrow("숫자를 입력해주세요.");
});

test(`구입 금액이 ${LOTTO.PURCHASE.unit.toLocaleString()}원보다 작은 경우 예외를 발생시킨다.`, () => {
  const price = 500;

  expect(() => validate.minimumValue(price)).toThrow(
    "구입 금액은 1,000원 이상이여야 합니다."
  );
});

test(`구입 금액이 ${LOTTO.PURCHASE.maxThreshold.toLocaleString()}을 초과할 경우 예외를 발생시킨다.`, () => {
  const price = 25000;
  expect(() => validate.maximumValue(price)).toThrow(
    "구입 금액은 20,000원 이하여야 합니다."
  );
});

test("당첨번호가 숫자가 아닐 경우 예외를 발생시킨다.", () => {
  const numbers = [1, 2, 3, 4, 5, "aa"];
  expect(() => validate.winningNumberisNumeric(numbers)).toThrow(
    "당첨 번호는 숫자여야 합니다."
  );
});

test.each([0, 46])(
  "로또 번호가 1부터 45 사이가 아니라면 예외를 발생시킨다.",
  (number) => {
    expect(() => validate.lottoNumberRange(number)).toThrow(
      "당첨 번호가 1부터 45 사이의 숫자여야 합니다."
    );
  }
);

test("당첨 번호가 서로 중복되는 경우 예외를 발생시킨다.", () => {
  const numbers = [1, 1, 2, 3, 4, 5];
  expect(() => {
    validate.winningNumberDuplicate(numbers);
  }).toThrow("당첨 번호는 중복되지 않아야 합니다");
});

test("당첨 번호와 보너스 번호가 중복되는 경우 예외를 발생시킨다.", () => {
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 1;

  expect(() => validate.bonusNumberUnique(winningNumbers, bonusNumber)).toThrow(
    "보너스 번호는 당첨 번호와 중복되면 안됩니다."
  );
});

test("재시작 여부 입력 시 y/n이 아닐 경우 예외를 발생시킨다.", () => {
  expect(() => validate.restartInput("o")).toThrow(
    "입력은 y 또는 n만 가능합니다."
  );
});

test("당첨 번호가 6개가 아닐 경우 예외를 발생기킨다", () => {
  const winningNumber = [1, 2, 3, 4, 5, 6, 7];
  expect(() => validate.winningNumbersLength(winningNumber)).toThrow(
    "당첨 번호는 6개여야 합니다."
  );
});
