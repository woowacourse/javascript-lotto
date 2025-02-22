import { LOTTO, PURCHASE } from "../src/config/const.js";
import { ERROR_MESSAGE } from "../src/config/message.js";
import {
  validateIsNumeric,
  validateLottoNumberRange,
  validateMaximumValue,
  validateMinimumValue,
  validatePurchaseUnit,
  validateWinningNumberisNumeric,
  validateWinningNumberDuplicate,
  validateBonusNumberUnique,
  validateRestartInput,
  validateWinningNumbersLength,
} from "../src/utils/validate/validate.js";

describe("구입 금액 입력 예외 테스트", () => {
  test(`구입 급액이 ${PURCHASE.UNIT.toLocaleString()}원 단위가 아닐 경우 예외를 발생시킨다.`, () => {
    const price = 1500;

    expect(() => validatePurchaseUnit(price)).toThrow(
      ERROR_MESSAGE.PURCHASE_UNIT
    );
  });

  test("구입 금액이 숫자가 아닐 경우 예외를 발생시킨다.", () => {
    const price = "aa";

    expect(() => validateIsNumeric(price)).toThrow(ERROR_MESSAGE.IS_NUMERIC);
  });

  test(`구입 금액이 ${PURCHASE.UNIT.toLocaleString()}원보다 작은 경우 예외를 발생시킨다.`, () => {
    const price = 500;

    expect(() => validateMinimumValue(price)).toThrow(
      ERROR_MESSAGE.PURCHASE_MIN_VALUE
    );
  });

  test(`구입 금액이 ${PURCHASE.MAX_AMOUNT.toLocaleString()}원을 초과할 경우 예외를 발생시킨다.`, () => {
    const price = 25000;
    expect(() => validateMaximumValue(price)).toThrow(
      ERROR_MESSAGE.PURCHASE_MAX_VALUE
    );
  });
});

describe("당첨 번호와 보너스 번호 입력 예외 테스트", () => {
  test("당첨번호가 숫자가 아닐 경우 예외를 발생시킨다.", () => {
    const numbers = [1, 2, 3, 4, 5, "aa"];
    expect(() => validateWinningNumberisNumeric(numbers)).toThrow(
      ERROR_MESSAGE.WINNING_NUMBER_IS_NUMERIC
    );
  });

  test(`당첨 번호가 ${LOTTO.MIN_NUMBER}부터 ${LOTTO.MAX_NUMBER} 사이가 아니라면 예외를 발생시킨다.`, () => {
    const number = 46;
    expect(() => validateLottoNumberRange(number)).toThrow(
      ERROR_MESSAGE.LOTTO_NUMBER_RANGE
    );
  });

  test("당첨 번호가 서로 중복되는 경우 예외를 발생시킨다.", () => {
    const numbers = [1, 1, 2, 3, 4, 5];
    expect(() => {
      validateWinningNumberDuplicate(numbers);
    }).toThrow(ERROR_MESSAGE.WINNING_NUMBER_DUPLICATE);
  });

  test(`당첨 번호가 ${LOTTO.MAX_LENGTH}개가 아닐 경우 예외를 발생기킨다`, () => {
    const winningNumber = [1, 2, 3, 4, 5, 6, 7];
    expect(() => validateWinningNumbersLength(winningNumber)).toThrow(
      ERROR_MESSAGE.WINNING_NUMBERS_LENGTH
    );
  });

  test("당첨 번호와 보너스 번호가 중복되는 경우 예외를 발생시킨다.", () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 1;

    expect(() =>
      validateBonusNumberUnique(winningNumbers, bonusNumber)
    ).toThrow(ERROR_MESSAGE.BONUS_NUMBER_UNIQUE);
  });
});

test("재시작 여부 입력 시 y/n이 아닐 경우 예외를 발생시킨다.", () => {
  expect(() => validateRestartInput("o")).toThrow(ERROR_MESSAGE.RESTART_INPUT);
});
