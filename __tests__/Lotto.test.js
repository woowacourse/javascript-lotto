import purchaseLottoCount from "../src/purchaseLottoCount";

test("로또의 1장 가격은 1000원이다.", () => {
  const money = 1000;

  expect(purchaseLottoCount(money)).toBe(1);
});

test("로또는 1000원 단위로 구매하지않으면 에러가 발생한다.", () => {
  const money = 1500;

  expect(() => purchaseLottoCount(money)).toThrow();
});
