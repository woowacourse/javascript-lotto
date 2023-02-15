import NumberHandler from "../../src/util/NumberHandler.js";

describe("NumberHandler 테스트", () => {
  test.each([
    [1.123, 1.1],
    [1.56, 1.6],
    [1.0, 1],
    [100.05, 100.1],
    [100, 100],
  ])("소수점 둘째자리에서 반올림한다.", (floatNumber, roundedOffNumber) => {
    expect(NumberHandler.roundOffNumber(floatNumber)).toBe(roundedOffNumber);
  });

  test.each([
    [NumberHandler.generateRandomNumber(1, 45)],
    [NumberHandler.generateRandomNumber(1, 45)],
    [NumberHandler.generateRandomNumber(1, 45)],
    [NumberHandler.generateRandomNumber(1, 45)],
    [NumberHandler.generateRandomNumber(1, 45)],
    [NumberHandler.generateRandomNumber(1, 45)],
    [NumberHandler.generateRandomNumber(1, 45)],
    [NumberHandler.generateRandomNumber(1, 45)],
    [NumberHandler.generateRandomNumber(1, 45)],
    [NumberHandler.generateRandomNumber(1, 45)],
    [NumberHandler.generateRandomNumber(1, 45)],
    [NumberHandler.generateRandomNumber(1, 45)],
    [NumberHandler.generateRandomNumber(1, 45)],
    [NumberHandler.generateRandomNumber(1, 45)],
    [NumberHandler.generateRandomNumber(1, 45)],
  ])("generateRandomNumber가 1~45사이의 숫자를 반환한다.", (randomNumber) => {
    const rangeNumbers = Array.from({ length: 45 }, (_, index) => index + 1);

    console.log(randomNumber);
    expect(rangeNumbers.includes(randomNumber)).toBeTruthy();
  });

  /**
   * TODO
   * - [ ]  메서드) 천의 자리마다 콤마 찍기 - 테스트하기
   */

  test.each([
    [1, "1"],
    [10, "10"],
    [100, "100"],
    [1000, "1,000"],
    [10000, "10,000"],
    [100000, "100,000"],
    [1000000, "1,000,000"],
  ])("천의 자리마다 콤마를 찍어 문자열로 반환한다.", (number, string) => {
    const numberString = NumberHandler.addComma(number);

    expect(numberString).toBe(string);
    expect(typeof numberString).toBe("string");
  });
});
