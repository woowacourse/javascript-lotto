import generateLottoNumbersSet from "../src/domain/LottoMachine/generateLottoNumbersSet";

describe("generateLottoNumbersSet 도메인 테스트", () => {
  test("주어진 개수만큼 난수 번호들(6개) 세트가 생성되어야 한다.", () => {
    const count = 3;
    const lottoNumbersSet = generateLottoNumbersSet(count);
    expect(lottoNumbersSet.length).toBe(count);
  });
});
