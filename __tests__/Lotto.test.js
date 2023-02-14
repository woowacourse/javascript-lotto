import Lotto from "../src/Lotto";

test("로또 갯수만큼 로또 객체를 생성하는 테스트", () => {
  const lottoNumbers = [8, 21, 23, 41, 42, 43];
  const lotto = new Lotto(lottoNumbers);

  expect(lotto.getLottoNumbers()).toEqual([8, 21, 23, 41, 42, 43]);
});
