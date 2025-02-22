import { LOTTO_PURCHASE_UNIT } from "../src/constants/constant.js";
import purchaseLottoCount from "../src/domain/LottoMachine/purchaseLottoCount.js";

test(`구매 금액이 ${LOTTO_PURCHASE_UNIT}의 배수일 때 올바른 개수 반환`, () => {
  expect(purchaseLottoCount(1000)).toBe(1);
  expect(purchaseLottoCount(5000)).toBe(5);
  expect(purchaseLottoCount(12000)).toBe(12);
});
