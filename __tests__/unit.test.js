import Lotto from "../src/domain/Lotto.js";

test("로또 객체를 생성하면 로또 번호가 저장된다.", () => {
  const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

  expect(lotto.getLottoNumber()).toEqual([1, 2, 3, 4, 5, 6]);
});
