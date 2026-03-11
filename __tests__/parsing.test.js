import { ERROR_MESSAGE } from "../src/constants/errorMessage.js";
import { parsingNumbers } from "../src/utils/parsing.js";

describe("문자열 파싱 테스트", () => {
  test.each([
    [
      "정상적으로 처리하는 경우 파싱한다.",
      "1,2,3,4,5,6",
      [1, 2, 3, 4, 5, 6],
      null,
    ],
    [
      "숫자가 공백을 포함한 경우 공백을 제거한 후 파싱한다.",
      "1,2,     3     , 4 ,5 , 6",
      [1, 2, 3, 4, 5, 6],
      null,
    ],
    [
      "숫자와 문자가 같이 입력된 경우 NOT_NUMBER 에러를 발생시킨다.",
      "1,2,3,4m,5,6",
      null,
      ERROR_MESSAGE.NOT_NUMBER,
    ],
    [
      "구분자 형식이 오류가 난 경우 INVALID_NUMBER_LENGTH 에러를 발생시킨다.",
      "1,2,3,4,5 6",
      null,
      ERROR_MESSAGE.INVALID_NUMBER_LENGTH,
    ],
  ])("%s", (_, numberString, expected, expectedError) => {
    if (expectedError) {
      expect(() => parsingNumbers(numberString)).toThrow(expectedError);
      return;
    }

    expect(parsingNumbers(numberString)).toEqual(expected);
  });
});
