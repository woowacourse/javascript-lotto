import { getRandomLotto, getLottos } from "../src/service/getRandomLotto.js";
import { RANDOM_CONSTANT } from "../src/constants/constant.js";

describe("getRandomLotto", () => {
  test("랜덤 로또 번호 6개를 반환한다.", () => {
    const result = getRandomLotto();
    expect(result.length).toBe(RANDOM_CONSTANT.COUNT);
  });

  test("랜덤으로 발급한 로또 번호는 중복되지 않는다.", () => {
    const lottos = getRandomLotto();
    const lottoSet = new Set(lottos);
    expect(lottoSet.size).toBe(RANDOM_CONSTANT.COUNT);
  });
});

describe("getLottos", () => {
  test("구입 금액만큼 랜덤으로 발급받은 로또 객체를 반환한다.", () => {
    const count = 2;
    const result = getLottos(count);
    expect(result.length).toBe(2);
  });
});
