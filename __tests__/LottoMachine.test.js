import LottoMachine from "../src/domain/LottoMachine.js";
import Lotto from "../src/domain/Lotto.js";
import Winnings from "../src/domain/Winnings.js";
import { PRICE } from "../src/constant/Definition.js";

describe("LottoMachine 클래스 테스트", () => {
  let lottoMachine;
  let winnings;

  beforeEach(() => {
    lottoMachine = new LottoMachine(Lotto);

    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    winnings = new Winnings(winningNumbers, bonusNumber);
    lottoMachine.defineRule(winnings);
  });

  test("publishLottos(money): 금액에 따라 올바른 개수의 로또가 생성되는가?", () => {
    const money = 10000;
    const lottos = lottoMachine.publishLottos(money);

    expect(lottos).toHaveLength(money / PRICE.LOTTO);
    lottos.forEach((lotto) => {
      expect(Array.isArray(lotto)).toBe(true);
      expect(lotto).toHaveLength(6);
      expect(new Set(lotto).size).toBe(6);
    });
  });

  test("defineRule(winnings): 당첨 규칙이 정상적으로 설정되는가?", () => {
    expect(lottoMachine.winnings).toBe(winnings);
  });

  test("drawWinning(purchasePrice): 당첨 통계 및 당첨률 계산 로직이 유효한 값인가?", () => {
    const purchasePrice = 5000;
    lottoMachine.publishLottos(purchasePrice);

    const result = lottoMachine.drawWinning(purchasePrice);

    expect(result).toHaveProperty("countStatistics");
    expect(result).toHaveProperty("winningRate");
    expect(typeof result.winningRate).toBe("number");
  });
});
