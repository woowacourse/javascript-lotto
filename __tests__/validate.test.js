import { validatePrice } from "../src/validate";

test("구입급액이 1,000원 단위가 아닐 경우 예외를 발생시킨다.", () => {
  const price = 1500;

  expect(() => validatePrice(price)).toThrow(
    "구입 금액은 1000원 단위로 입력해주세요."
  );
});
