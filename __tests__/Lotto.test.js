import Lotto from "../src/domain/Lotto.js";
import purchaseLottoCount from "../src/domain/purchaseLottoCount.js";

test("로또의 1장 가격은 1000원이다.", () => {
  const money = 1000;

  expect(purchaseLottoCount(money)).toBe(1);
});

describe("로또 도메인 테스트", () => {
  const lottoNumber = [1, 2, 3, 4, 5, 6];
  const reverseLottoNumber = [6, 5, 4, 3, 2, 1];

  test("로또 번호는 6자리이다.", () => {
    const lotto = new Lotto(lottoNumber);
    expect(lotto.lottoNumbers.length).toBe(6);
  });

  test("로또 번호는 오름차순으로 정렬된다.", () => {
    const lotto = new Lotto(reverseLottoNumber);
    expect(lotto.lottoNumbers).toEqual(lottoNumber);
  });
});
