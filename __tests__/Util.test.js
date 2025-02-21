import { divideByUnit } from "../src/utils/count";
import { PRICE } from "../src/constants/price";

test("입력받은 금액에 해당하는 개수를 구한다.", () => {
  // given
  const money = 1000;

  // when
  const result = divideByUnit(money, PRICE.UNIT);

  // then
  expect(result).toBe(1);
});
