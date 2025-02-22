import { BONUS, MATCH_COUNT, WINNING } from "../src/constants/constant";
import Lotto from "../src/domain/Lotto";
import LottoPack from "../src/domain/LottoPack";

describe("LottoPack 도메인 테스트", () => {
  const sampleLottos = [
    [1, 2, 3, 4, 5, 6],
    [1, 2, 7, 8, 9, 6],
    [2, 3, 13, 4, 5, 6],
  ];
  const count = 3;
  test("LottoPack은 주입된 갯수에 비례해 로또가 발행되어야한다.", () => {
    const lottoPack = new LottoPack(sampleLottos, count);
    expect(lottoPack.lottos.length).toBe(count);
  });

  test("LottoPack은 Lotto Instance들을 반환해야한다.", () => {
    const lottoPack = new LottoPack(sampleLottos);
    expect(lottoPack.lottos[0]).toBeInstanceOf(Lotto);
  });

  test("LottoPack은 당첨 번호를 올바르게 카운트해야 한다.", () => {
    const lottoPack = new LottoPack(sampleLottos, count);

    const answerLotto = {
      1: WINNING,
      2: WINNING,
      3: WINNING,
      4: WINNING,
      5: WINNING,
      6: WINNING,
      7: BONUS,
    };

    const result = lottoPack.compareAndReturnResult(answerLotto);

    expect(result).toEqual({
      [MATCH_COUNT.SIX]: 1,
      [MATCH_COUNT.FIVE_BONUS]: 0,
      [MATCH_COUNT.FIVE]: 1,
      [MATCH_COUNT.FOUR]: 0,
      [MATCH_COUNT.THREE]: 1,
    });
  });
});
