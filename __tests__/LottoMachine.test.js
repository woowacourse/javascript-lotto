import createSixRandomNumber from "../src/domain/createSixRandomNumber";

test("1~45 중 6개의 랜덤 값을 생성한다.", () => {
  const randomValue = createSixRandomNumber();
  expect(randomValue).toHaveLength(6);
  expect(randomValue.every((num) => num >= 1 && num <= 45)).toBe(true);
});
