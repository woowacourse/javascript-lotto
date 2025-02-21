import countMatchingNumbers from "../src/utils/countMatchingNumbers.js";

describe("두 개의 숫자 배열에서 서로 일치하는 숫자의 개수를 계산하는 함수 테스트", () => {
  test.each([
    // given
    {
      description: "0개 일치하는 경우 숫자 0를 반환한다.",
      checkingArray: [0, 3],
      expectedReturnNumber: 0,
    },
    {
      description: "1개 일치하는 경우 숫자 1를 반환한다.",
      checkingArray: [1, 3],
      expectedReturnNumber: 1,
    },
    {
      description: "2개 일치하는 경우 숫자 2를 반환한다.",
      checkingArray: [1, 2],
      expectedReturnNumber: 2,
    },
  ])("$descripion", ({ checkingArray, expectedReturnNumber }) => {
    // given
    const referenceArray = [1, 2];

    // when
    const matchedCount = countMatchingNumbers(referenceArray, checkingArray);

    // then
    expect(matchedCount).toBe(expectedReturnNumber);
  });
});
