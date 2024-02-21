import randomLottoArray from "../src/domain/randomLottoMaker.js";

describe("로또 번호 생성기 테스트", () => {
  // given
  const testCases = [
    {
      counts: 1,
    },
    {
      counts: 5,
    },
  ];

  test.each(testCases)(
    "counts가 $counts일 때, randomLottoArray의 길이는 counts인 $counts와 같다.",
    ({ counts }) => {
      // when
      const result = randomLottoArray(counts);

      // then
      expect(result.length).toBe(counts);
    }
  );

  test.each(testCases)(
    "counts가 $counts일 때, randomLottoArray의 각 배열의 길이는 6이다.",
    ({ counts }) => {
      // when
      const result = randomLottoArray(counts);

      // then
      result.forEach((lottoNumbers) => {
        expect(lottoNumbers.length).toBe(6);
      });
    }
  );

  test.each(testCases)(
    "counts가 $counts일 때, randomLottoArray의 각 원소들이 1부터 45까지의 범위 내에 있다.",
    ({ counts }) => {
      // when
      const result = randomLottoArray(counts);

      // then
      result.flat().forEach((number) => {
        expect(number).toBeGreaterThanOrEqual(1);
        expect(number).toBeLessThanOrEqual(45);
      });
    }
  );
});
