import { LOTTO } from "../src/constants/lotto.js";
import { generateRandomLottos } from "../src/domain/lottoGenerator.js";

describe("로또 기능 테스트", () => {
  test("숫자 6개를 가진 로또를 생성한다.", () => {
    const lottos = generateRandomLottos(2);
    lottos.forEach((lotto) => expect(lotto.get()).toHaveLength(LOTTO.count));
  });
});
