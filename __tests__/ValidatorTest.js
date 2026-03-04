import Validator from "../src/Utils/Validator.js";
import { MissionUtils } from "@woowacourse/mission-utils";

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
});
