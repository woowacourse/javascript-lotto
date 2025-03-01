import { matchLotto } from "../domain/matchLotto.js";
import { purchaseLotto } from "../domain/purchaseLotto.js";
import { calculateRank } from "../domain/calculateRank.js";
import LottoResult from "../domain/LottoResult.js";
import { calculateWinningRate } from "../domain/calculateWinningRate.js";
import { LOTTO_CONDITION } from "../constants/constants.js";

export const webLottoService = {
    purchaseLotto(purchaseMoney) {
      return purchaseLotto(purchaseMoney);
    },

    calculateLottoResult(lottoList, winningLotto) {
      const rankingList = lottoList.map((lotto) => {
        return calculateRank(matchLotto.winningNumbers(winningLotto, lotto), matchLotto.bonusNumber(winningLotto, lotto));
      });
      return new LottoResult(rankingList);
    },

    calculateWinningRate(lottoList, lottoResult) {
        return calculateWinningRate(LOTTO_CONDITION.PRICE * lottoList.length, lottoResult.totalPrize);
      },
  };