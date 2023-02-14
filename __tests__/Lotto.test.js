import Lotto from "../src/Lotto";

describe("Lotto 객체 단위테스트", () => {
  test("로또 갯수만큼 로또 객체를 생성하는 테스트", () => {
    const lottoNumbers = [8, 21, 23, 41, 42, 43];
    const lotto = new Lotto(lottoNumbers);

    expect(lotto.getLottoNumbers()).toEqual([8, 21, 23, 41, 42, 43]);
  });

  test("로또 숫자를 오름차순 정렬하는 함수 테스트", () => {
    const lottoNumbers = [42, 41, 21, 43, 8, 23];
    const lotto = new Lotto(lottoNumbers);
    lotto.sortLottoNumbers();

    expect(lotto.getLottoNumbers()).toEqual([8, 21, 23, 41, 42, 43]);
  });
});
