import LottoResultMaker from "../src/domain/LottoResultMaker";

describe("LottoResultMaker에 대한 유닛 테스트", () => {
  test("등수 배열을 수익률과 등수정보를 담은 객체 형태로 정리해서 반환한다.", () => {
    const ranks = [-1, 1, 2, 5];

    expect(LottoResultMaker.getLottoResult(ranks)).toEqual({
      rankResult: Object.freeze({
        first: 1,
        second: 1,
        third: 0,
        fourth: 0,
        fifth: 1,
        none: 1,
      }),
      profitRate: (2_030_005_000 / 4000) * 100,
    });
  });
});
