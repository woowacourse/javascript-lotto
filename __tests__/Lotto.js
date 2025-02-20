import Lotto from "../src/Lotto.js";

describe("Lotto", () => {
  test("로또는 6개의 숫자로 이뤄진 배열이다.", () => {
    // 로또를 생성한다.
    const lottoNumbers = [1, 2, 3, 4, 5, 6];
    const lotto = new Lotto(lottoNumbers);

    // 로또가 6개의 값을 가진다.

    expect(lotto.numbers).toEqual(lottoNumbers);
  });
});
