import { calculateRank } from "./domain/calculateRank.js";
import LottoResult from "./domain/LottoResult.js";
import { matchLotto } from "./domain/matchLotto.js";
import { calculateWinningRate } from "./domain/calculateWinningRate.js";
import { LOTTO_CONDITION} from "./constants/constants.js";
import { calculateTotalPrize } from "./domain/calculateTotalPrize.js";
import { purchaseLotto } from "./domain/purchaseLotto.js";

export const lottoService =  {
    purchaseLotto(purchaseMoney){
        return purchaseLotto(purchaseMoney)
    },

    calculateLottoResult(lottoList, winningLotto) {
        const lottoResult = new LottoResult();

        lottoList.forEach((lotto)=>{
                lotto.ranking = calculateRank(matchLotto.winningNumbers(winningLotto, lotto), matchLotto.bonusNumber(winningLotto, lotto))
                lottoResult.addRankingCount(lotto.ranking);
        })

        return lottoResult
    },

    calculateWinningRate(lottoList){
        return calculateWinningRate(LOTTO_CONDITION.PRICE*lottoList.length,calculateTotalPrize(lottoList))
    },
};
