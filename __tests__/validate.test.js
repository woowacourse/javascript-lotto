import {
  validateIsNumeric,
  validateLottoNumberRange,
  validateMaximumValue,
  validateMinimumValue,
  validatePurchaseUnit,
  validateWinningNumberisNumeric,
  validateWinningNumberDuplicate,
  validateBonusNumberUnique,
} from "../src/validate";

test("구입급액이 1,000원 단위가 아닐 경우 예외를 발생시킨다.", () => {
  const price = 1500;

  expect(() => validatePurchaseUnit(price)).toThrow(
    "구입 금액은 1000원 단위로 입력해주세요."
  );
});

test("구입금액이 숫자가 아닐 경우 예외를 발생시킨다.", () => {
  const price = "aa";

  expect(() => validateIsNumeric(price)).toThrow("숫자를 입력해주세요.");
});

test("구입 금액이 1000원보다 작은 경우 예외를 발생시킨다.", () => {
  const price = 500;

  expect(() => validateMinimumValue(price)).toThrow(
    "구입 금액은 1,000원 이상이여야 합니다."
  );
});

test("구입 금액이 20,000을 초과할 경우 예외를 발생시킨다.", () => {
  const price = 25000;
  expect(() => validateMaximumValue(price)).toThrow(
    "구입 금액은 20,000원 이하여야 합니다."
  );
});

test("당첨번호가 숫자가 아닐 경우 예외를 발생시킨다.", () => {
  const numbers = [1, 2, 3, 4, 5, "aa"];
  expect(() => validateWinningNumberisNumeric(numbers)).toThrow(
    "당첨 번호는 숫자여야 합니다."
  );
});

test.each([0, 46])(
  "로또 번호가 1부터 45 사이가 아니라면 예외를 발생시킨다.",
  (number) => {
    expect(() => validateLottoNumberRange(number)).toThrow(
      "당첨 번호가 1부터 45 사이의 숫자여야 합니다."
    );
  }
);

test("당첨 번호가 서로 중복되는 경우 예외를 발생시킨다.", () => {
  const numbers = [1, 1, 2, 3, 4, 5];
  expect(() => {
    validateWinningNumberDuplicate(numbers);
  }).toThrow("당첨 번호는 중복되지 않아야 합니다");
});

test("당첨 번호와 보너스 번호가 중복되는 경우 예외를 발생시킨다.", () => {
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 1;

  expect(() => validateBonusNumberUnique(winningNumbers, bonusNumber)).toThrow(
    "보너스 번호는 당첨 번호와 중복되면 안됩니다."
  );
});
