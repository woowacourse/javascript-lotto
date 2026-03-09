import Lotto from "../../src/models/Lotto.js";
import { resultCalculator } from "../../src/services/ResultCalculator.js";

const AGGREGATION_TEST_CASES = [
  { desc: "6개 번호 일치 1등", result: { matchCount: 6, hasBonus: false }, expectedIndex: 4 },
  { desc: "5개 번호 + 보너스 번호 일치 2등", result: { matchCount: 5, hasBonus: true }, expectedIndex: 3 },
  { desc: "5개 번호 일치 3등", result: { matchCount: 5, hasBonus: false }, expectedIndex: 2 },
  { desc: "4개 번호 일치 4등", result: { matchCount: 4, hasBonus: false }, expectedIndex: 1 },
  { desc: "3개 번호 일치 5등", result: { matchCount: 3, hasBonus: false }, expectedIndex: 0 },
  { desc: "2개 이하 번호 일치 낙첨", result: { matchCount: 2, hasBonus: false }, expectAllZero: true },
];

describe("로또와 당첨 번호를 비교한다.", () => {
  AGGREGATION_TEST_CASES.forEach(({ desc, result, expectedIndex, expectAllZero }) => {
    test(desc, () => {
      const data = resultCalculator([result]);
      if (expectAllZero) {
        expect(data.every((r) => r.count === 0)).toBe(true);
      } else {
        expect(data[expectedIndex].count).toBe(1);
      }
    });
  });
});

describe("로또 번호가 오름차순으로 정렬된다.", () => {
  test("로또 번호가 오름차순으로 정렬된다.", () => {
    //출력: 오름차순으로 정렬된 로또 번호 6개
    const UNSORTED_ARRAY = [8, 3, 5, 1, 6, 2];
    const SORTED_ARRAY = [1, 2, 3, 5, 6, 8];
    expect(new Lotto(UNSORTED_ARRAY).getNumbers()).toEqual(SORTED_ARRAY);
  });
});
