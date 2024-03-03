import Lotto from "../../step1-console/domain/Lotto.js";
import LottoNumber from "../../step1-console/domain/LottoNumber.js";
import LottoResultMaker from "../../step1-console/domain/LottoResultMaker.js";
import LottoSeller from "../../step1-console/domain/LottoSeller.js";
import Money from "../../step1-console/domain/Money.js";
import WinningLotto from "../../step1-console/domain/WinningLotto.js";

import { parseNumber } from "../../step1-console/utils/parseNumber.js";

export const lottoService = {
  buyLottos(buyAmount) {
    const money = new Money(parseNumber(buyAmount));
    const lottos = LottoSeller.sell(money);

    return lottos;
  },

  createWinningLotto(winningNumbers, bonusNumber) {
    const lottos = new Lotto(winningNumbers);
    const bounusNumber = new LottoNumber(bonusNumber);

    return new WinningLotto(lottos, bounusNumber);
  },

  rankLottos(lottos, winningLotto) {
    const ranks = winningLotto.rankLottos(lottos);
    const rankResult = LottoResultMaker.arrangeRanks(ranks);

    return rankResult;
  },

  calculateProfitRate(lottos, winningLotto) {
    const ranks = winningLotto.rankLottos(lottos);
    const profitRate = LottoResultMaker.calculateProfitRate(ranks);

    return profitRate;
  },
};
