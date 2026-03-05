describe("사용자 입력 파싱 테스트", () => {
  test("유저 입력을 숫자로 파싱(구입 금액)", () => {
    expect(Parser.stringToNumber("1000")).toBe(1000);
  });
  test("유저 입력을 숫자로 파싱(숫자가 아닌 문자열을 입력했을 때)", () => {
    expect(Parser.stringToNumber("가나다라")).toBe(NaN);
  });
  test("유저 입력을 숫자로 파싱(보너스 번호)", () => {
    expect(Parser.stringToNumber("7")).toBe(7);
  });
  test("당첨 번호 문자열 숫자 배열로 파싱", () => {
    expect(Parser.stringToNumberArray("1,2,3,4,5,6")).toEqual([
      1, 2, 3, 4, 5, 6,
    ]);
  });
  test("당첨 번호 문자열 숫자 배열로 파싱(숫자가 아닌 문자열을 입력했을 때)", () => {
    expect(Parser.stringToNumberArray("1,2,3,4,abc,6")).toEqual([
      1,
      2,
      3,
      4,
      NaN,
      6,
    ]);
  });
  test.each([
    { input: "Y", expected: "y" },
    { input: "N", expected: "n" },
  ])("$input → $expected로 소문자 파싱", ({ input, expected }) => {
    expect(Parser.capitalToSmall(input)).toBe(expected);
  });
});
