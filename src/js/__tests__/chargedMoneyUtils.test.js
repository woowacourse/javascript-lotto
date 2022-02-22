import { isPositiveInteger, isDivisible } from "../utils/validator.js";

it("입력란이 빈칸일 수 없다.", () => {
  const input = "";

  expect(isPositiveInteger(input)).toBe(false);
});

it("숫자만 입력할 수 있다.", () => {
  const input = "천원";

  expect(isPositiveInteger(input)).toBe(false);
});

it("천원 단위로 입력할 수 있다.", () => {
  const input = 1100;

  expect(isDivisible(input, 1000)).toBe(false);
});

it("로또 금액을 입력할 수 있다.", () => {
  const input = 2000;

  expect(isPositiveInteger(input)).toBe(true);
  expect(isDivisible(input, 1000)).toBe(true);
});
