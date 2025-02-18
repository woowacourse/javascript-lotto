import { PRICE_NUM } from "../src/constants/lotto.js";
import { count } from "../src/utils/count.js";
import createLotto from "../src/domain/createLotto.js";

// TODO : 추후 다른 폴더로 변경 예정
test("입력받은 금액에 해당하는 개수를 구한다.", () => {
  // given
  const money = 1000;

  // when
  const result = count(money, PRICE_NUM);

  // then
  expect(result).toBe(1);
});

//TODO : 추후 다른 폴더나 class로 변경 예정
test("정해진 개수만큼 로또를 생성한다.", () => {
  // given
  const lottoCount = 3;

  // when
  const lottos = createLotto(lottoCount);

  // then
  expect(lottos.length).toBe(lottoCount);
});
