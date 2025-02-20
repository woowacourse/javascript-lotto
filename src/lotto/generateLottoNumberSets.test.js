import generateLottoNumberSets from "./generateLottoNumberSets.js";

describe("generateLottoNumberSets 테스트", () => {
  test("3000원으로 로또 번호를 3개 구매한다.", () => {
    const price = 3000;
    const lottoNumbers = generateLottoNumberSets(price);
    expect(lottoNumbers).toHaveLength(3);
  });
});
