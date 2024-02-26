import getRandomLottoArray from "../src/domain/getRandomLottoArray.js";

describe("getRandomLottoArray 테스트", () => {
  // given
  const testCases = [
    {
      input: 1,
    },
    {
      input: 5,
    },
  ];

  test.each(testCases)("입력값이 %o 일 때, randomLottoArray의 길이는 입력값과 같다.", ({ input }) => {
    // when
    const result = getRandomLottoArray(input);

    // then
    expect(result.length).toBe(input);
  });

  test.each(testCases)("입력값이 %o 일 때, randomLottoArray의 각 배열의 길이는 6이다.", ({ input }) => {
    // when
    const result = getRandomLottoArray(input);

    // then
    result.forEach((lottoNumbers) => {
      expect(lottoNumbers.length).toBe(6);
    });
  });

  test.each(testCases)(
    "입력값이 %o 일 때, randomLottoArray의 각 원소들은 1부터 45까지의 범위 내에 있다.",
    ({ input }) => {
      // when
      const result = getRandomLottoArray(input);

      // then
      result.flat().forEach((number) => {
        expect(number).toBeGreaterThanOrEqual(1);
        expect(number).toBeLessThanOrEqual(45);
      });
    },
  );
});
