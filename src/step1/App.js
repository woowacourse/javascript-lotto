// import LottoController from "./controllers/LottoController";

import { LOTTO_REWARDS, LOTTO_RULES, exchangeRank } from "./constants/rules";
import LottoGame from "./controllers/LottoGame";
import LottoRules from "./domains/LottoRules";

class App {
  async run() {
    const lottoRules = new LottoRules({
      price: LOTTO_RULES.price,
      maxQuantity: LOTTO_RULES.maxQuantity,
      lottoLength: LOTTO_RULES.length,
      minNumber: LOTTO_RULES.minNumber,
      maxNumber: LOTTO_RULES.maxNumber,
      rewardInfo: LOTTO_REWARDS,
      exchangeRank: exchangeRank,
    });

    await new LottoGame(lottoRules).start();
  }
}

export default App;
