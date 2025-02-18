import { PRICE_NUM } from "../src/constants/lotto.js";
import { count } from "../src/utils/count.js";

// TODO : 추후 다른 폴더로 변경 예정
test("입력받은 금액에 해당하는 개수를 구한다.", () => {
  // given
  const money = 1000;

  // when
  const result = count(money, PRICE_NUM);

  // then
  expect(result).toBe(1);
});
