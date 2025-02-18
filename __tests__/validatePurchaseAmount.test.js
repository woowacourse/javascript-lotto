import validatePurchaseAmount from "../src/domain/validation/validatePurchaseAmount";

describe("구입 금액 유효성 테스트", () => {
  test.each([
    {
      description: "숫자가 아닌 경우",
      input: "숫자아님",
    },
    {
      description: "1,000원 미만인 경우",
      input: "999",
    },
    {
      description: "1,000원 단위가 아닌 경우",
      input: "1001",
    },
    {
      description: "100,000원을 초과하는 경우",
      input: "100001",
    },
  ])("구입 금액이 $description 에러가 발생한다.", ({ input }) => {
    // given
    // when & then
    expect(() => {
      validatePurchaseAmount(input);
    }).toThrow();
  });
});
