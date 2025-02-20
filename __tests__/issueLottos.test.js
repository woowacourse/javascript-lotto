import issueLottos from "../src/domains/issueLottos.js";
import { MIN_UNIT } from "../src/constants/constants.js";

describe("구입 금액에 따른 개수만큼 랜덤한 로또를 발행하는 메서드 테스트", () => {
  // given
  const purchaseAmount = MIN_UNIT * 8;
  const lottoCount = purchaseAmount / MIN_UNIT;

  test("구입 금액에 따라 발행할 로또 개수를 반환한다.", () => {
    // when
    const lottos = issueLottos(purchaseAmount);

    // then
    expect(lottos).toHaveLength(lottoCount);
  });

  test("발행된 로또는 오름차순 정렬이 되어 반환된다.", () => {
    // when
    const lottos = issueLottos(purchaseAmount);
    const sortedLottos = lottos.map((lotto) => lotto.sort((a, b) => a - b));

    // then
    lottos.forEach((lotto, index) => {
      expect(lotto).toEqual(sortedLottos[index]);
    });
  });
});
