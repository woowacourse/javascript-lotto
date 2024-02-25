import getLottoPrizeMoney from "../src/domain/getLottoPrizeMoney.js";

describe("getLottoPrizeMoney 테스트", () => {
  const testCases = [
    [
      {
        1: 2,
        2: 1,
        3: 3,
        4: 0,
        5: 0,
      },
      2000000000 * 2 + 30000000 + 1500000 * 3,
    ],
    [
      {
        1: 0,
        2: 0,
        3: 0,
        4: 2,
        5: 5,
      },
      50000 * 2 + 5000 * 5,
    ],
    [
      {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
      0,
    ],
  ];

  test.each(testCases)(
    "입력값이 %o일 때, getLottoPrizeMoney의 결과는 %p이다.",
    (input, expectedPrizeMoney) => {
      expect(getLottoPrizeMoney(input)).toBe(expectedPrizeMoney);
    },
  );
});
