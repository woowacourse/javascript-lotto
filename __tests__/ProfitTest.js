import { LOTTO_RULE } from "../src/utils/constants.js";
import calculateProfitRate from "../src/model/calculateProfit.js";
import { getLogSpy } from "../src/utils/testUtils.js";
import OutputView from "../src/view/OutputView.js";

test("수익률 계산 test", () => {
  const logSpy = getLogSpy();

  const purchasedAmount = 1000;
  const stats = {
    [LOTTO_RULE["3_MATCH"]]: { count: 2, prize: 5000 },
    [LOTTO_RULE["4_MATCH"]]: { count: 0, prize: 50000 },
    [LOTTO_RULE["5_MATCH"]]: { count: 0, prize: 1500000 },
    [LOTTO_RULE["5_BONUS_MATCH"]]: { count: 0, prize: 30000000 },
    [LOTTO_RULE["6_MATCH"]]: { count: 0, prize: 2000000000 },
  };

  const profitRate = calculateProfitRate(purchasedAmount, stats);
  OutputView.printProfitRate(profitRate);

  expect(logSpy).toHaveBeenCalledWith(
    expect.stringContaining(`총 수익률은 1000.0%입니다.`)
  );
});
