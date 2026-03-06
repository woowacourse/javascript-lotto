import Validator from "../src/Utils/Validator.js";

describe("Validator 테스트", () => {
  test.each([
    { input: "1000 ", expected: "1000" },
    { input: "7500", expected: "7500" },
  ])("구입 금액 유효성 검증 테스트: ", ({ input, expected }) => {
    return expect(Validator.validatePurchasePrice(input)).toBe(expected);
  });

  test.each([
    { input: "abcde", message: "숫자 아님" },
    { input: "999", message: "1000원 이상 체크" },
    { input: "", message: "빈 문자열" },
    { input: "    ", message: "공백만 있는 경우" },
  ])("구입 금액 예외 테스트: ", ({ input }) => {
    return expect(() => Validator.validatePurchasePrice(input)).toThrow(
      /^\[ERROR\]/,
    );
  });

  test.each([
    { input: "1,2,3,4,5,6", expected: [1, 2, 3, 4, 5, 6] },
    { input: "40,41,42,43,44,45", expected: [40, 41, 42, 43, 44, 45] },
  ])("당첨 번호 정상 테스트: $input", ({ input, expected }) => {
    return expect(Validator.validateWinningNumbers(input)).toEqual(expected);
  });

  test.each([
    { input: "1,2,3,4,5", message: "당첨 번호 개수 부족" },
    { input: "0,1,2,3,4,5", message: "당첨 번호 하한 범위 이탈" },
    { input: "1,2,3,4,5,46", message: "당첨 번호 상한 범위 이탈" },
    { input: "a,b,c,d,e,f", message: "당첨 번호 숫자 아님" },
  ])('당첨 번호 예외 테스트: "$input", $message', ({ input }) => {
    return expect(() => Validator.validateWinningNumbers(input)).toThrow(
      /^\[ERROR\]/,
    );
  });

  test.each([
    { input: '1', winningNumbers: [2, 3, 4, 5, 6, 7], expected: 1 },
    { input: '45', winningNumbers: [1, 2, 3, 4, 5, 6], expected: 45 },
  ])("보너스 번호 정상 테스트: $input", ({ input, winningNumbers, expected }) => {
    return expect(Validator.validateBonusNumber(input, winningNumbers)).toEqual(expected);
  });

  test.each([
    { input: 'a', winningNumbers: [1, 2, 3, 4, 5, 6], message: '보너스 번호 숫자 아님' },
    { input: '0', winningNumbers: [1, 2, 3, 4, 5, 6], message: '보너스 번호 하한 이탈' },
    { input: '46', winningNumbers: [1, 2, 3, 4, 5, 6], message: '보너스 번호 상한 이탈' },
    { input: '1', winningNumbers: [1, 2, 3, 4, 5, 6], message: '당첨 번호와 중복' },
  ])('보너스 번호 예외 테스트: "$input", $message', ({ input, winningNumbers }) => {
    return expect(() => Validator.validateBonusNumber(input, winningNumbers)).toThrow(
      /^\[ERROR\]/,
    );
  });
}); 
