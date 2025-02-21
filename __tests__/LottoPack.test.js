import Lotto from "../src/domain/Lotto";
import LottoPack from "../src/domain/LottoPack";

describe("LottoPack 도메인 테스트", () => {
  const sampleLottos = [
    [1, 2, 3, 4, 5, 6],
    [1, 2, 7, 8, 9, 6],
    [2, 3, 13, 4, 5, 6],
  ];
  test("갯수에 비례해 로또가 발행된다.", () => {
    const lottoPack = new LottoPack(sampleLottos);
    expect(lottoPack.lottos.length).toBe(sampleLottos.length);
  });

  test("Lotto Pack은 Lotto Instance들을 반환해야한다.", () => {
    const lottoPack = new LottoPack(sampleLottos);
    expect(lottoPack.lottos[0]).toBeInstanceOf(Lotto);
  });
});
