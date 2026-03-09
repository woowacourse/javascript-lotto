import { ERROR_MESSAGE } from "../../src/constants/errorMessage.js";
import { parsingNumbers } from "../../src/utils/parsing.js";

describe("문자열 파싱 테스트", () => {
  test("로또 번호 파싱 시의 유효성 검사", () => {
    const numberString = "1,2,3,4m,5,6";

    expect(() => parsingNumbers(numberString)).toThrow(
      ERROR_MESSAGE.NOT_NUMBER,
    );
  });
});
