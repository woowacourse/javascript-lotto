import validateWinningNumbers from "../src/domain/validation/validateWinningNumbers.js";

describe("당첨 번호 유효성 테스트", () => {
  test.each([
    {
      description: "숫자가 6개가 아닌 경우",
      input: "1,2,3,4,5,6,7",
    },
    {
      description: "숫자가 아닌 경우",
      input: "a,b,c,d,e,f",
    },
    {
      description: "정수가 아닌 경우",
      input: "1.1,2,3,4,5,6",
    },
    {
      description: "숫자 범위가 1 미만인 경우",
      input: "1,2,3,0,4,5",
    },
    {
      description: "숫자 범위가 45 초과인 경우",
      input: "1,2,3,4,5,66",
    },
    {
      description: "숫자가 중복되는 경우",
      input: "1,2,3,4,4,5",
    },
  ])("당첨 번호가 $description 에러가 발생한다.", ({ input }) => {
    // given
    // when & then
    expect(() => {
      validateWinningNumbers(input);
    }).toThrow();
  });
});
