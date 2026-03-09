import { LOTTO_NUMBER_RANGE, LOTTO_SIZE } from "../src/constants/lottoInfo";
import {
  makeLottos,
  pickUniqueNumbersInRange,
} from "../src/domain/LottoMachine";

describe("로또 발행 테스트", () => {
  test("생성된 로또 번호는 1-45 사이 중복되지 않는 6개 숫자여야 한다", () => {
    const lotto = pickUniqueNumbersInRange(
      LOTTO_NUMBER_RANGE.MIN,
      LOTTO_NUMBER_RANGE.MAX,
      LOTTO_SIZE,
    );
    expect(lotto).toHaveLength(LOTTO_SIZE);

    lotto.forEach((num) => {
      expect(num).toBeGreaterThanOrEqual(LOTTO_NUMBER_RANGE.MIN);
      expect(num).toBeLessThanOrEqual(LOTTO_NUMBER_RANGE.MAX);
    });

    const uniqueSize = new Set(lotto).size;
    expect(uniqueSize).toBe(LOTTO_SIZE);
  });

  test("입력한 개수에 맞는 로또 개수 만큼 로또가 발행된다.", () => {
    const amount = 3;
    const lottos = makeLottos(amount);
    expect(lottos).toHaveLength(3);
  });
});
