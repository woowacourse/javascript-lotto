import Validator from "../src/domain/Validator.js";

describe("Winnings의 numbers 유효성 검사", () => {
  test("당첨번호 배열 길이가 6인가?", () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
    const errorResults = Validator.winningNumbers(numbers);
    expect(errorResults.IS_WRONG_ARRAY_LENGTH).toEqual(true);
  });
  test("당첨번호 배열 안에 중복이 있는가?", () => {
    const numbers = [1, 2, 3, 4, 5, 5];
    const errorResults = Validator.winningNumbers(numbers);
    expect(errorResults.IS_DUPLICATED_NUMBER).toEqual(true);
  });
  test("당첨번호 배열의 숫자들이 1~45 사이의 숫자인가?", () => {
    const numbers = [1, 2, 3, 4, 5, 46];
    const errorResults = Validator.winningNumbers(numbers);
    expect(errorResults.IS_ARRAY_NUMBER_RANGE_OVER).toEqual(true);
  });
  test("당첨번호 배열의 숫자들이 자연수인가?", () => {
    const numbers = [1, 2, 3, 4, 5, 4.5];
    const errorResults = Validator.winningNumbers(numbers);
    expect(errorResults.IS_NOT_NATURAL_NUMBER_IN_ARRAY).toEqual(true);
  });
});

describe("Winnings의 bonusNumber 유효성 검사", () => {
  test("보너스 숫자가 1~45 사이의 숫자인가?", () => {
    const number = 46;
    const errorResults = Validator.bonusNumber(number);
    expect(errorResults.IS_NUMBER_RANGE_OVER).toEqual(true);
  });
  test("보너스 숫자가 자연수인가?", () => {
    const number = 4.5;
    const errorResults = Validator.bonusNumber(number);
    expect(errorResults.IS_NOT_NATURAL_NUMBER).toEqual(true);
  });
});

describe("winningNumbers와 bonusNumber 유효성 검사", () => {
  test("보너스 번호가 당첨 번호에 중복되지 않는가?", () => {
    const bonusNumber = 1;
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const errorResults = Validator.winningsAndBonus(
      winningNumbers,
      bonusNumber
    );
    expect(errorResults.IS_DUPLICATED).toEqual(true);
  });
});

describe("구입금액 유효성 검사", () => {
  test("1000 단위로 나누어 떨어지는가?", () => {
    const purchasePrice = 500;
    const errorResults = Validator.purchasePrice(purchasePrice);
    expect(errorResults.IS_NOT_MULTIPLE).toEqual(true);
  });

  test.each([[500], [10000000001]])(
    "1000 이상이고 100억 이하인가?",
    (purchasePrice) => {
      const errorResults = Validator.purchasePrice(
        purchasePrice,
        1000,
        10000000000
      );
      expect(errorResults.IS_NUMBER_RANGE_OVER).toEqual(true);
    }
  );
});
// - 배열 안에 중복이 있는가?
// - 1~45 사이의 숫자인가? -> isRangeNumber
// - 자연수인가? -> isNaturalNumber
// - 빈 값인가? -> isEmpty
// - 배열 길이가 6인가? isArrayLengthOver
// - ( array, num ) -> 배열안에 num 이 존재하는지? isExistInArray
// - 1000단위로 나누어 떨어지는 숫자인가? isThousandMultiple
//   => 당첨번호 메서드, 보너스번호 메서드, 구입금액 메서드
