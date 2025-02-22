import LottoMachine from "../src/domain/LottoMachine/LottoMachine";
import LottoPack from "../src/domain/LottoPack";

describe("LottoMachine 도메인 테스트", () => {
  test("금액을 넣으면 LottoPack(로또 용지)인스턴스가 나온다.", () => {
    const money = 3000;
    const lottoPack = LottoMachine(money);

    expect(lottoPack).toBeInstanceOf(LottoPack);
  });
});
