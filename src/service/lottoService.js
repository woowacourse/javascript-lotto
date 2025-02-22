import { calculateRank } from "../domain/calculateRank.js";
import LottoResult from "../domain/LottoResult.js";
import { matchLotto } from "../domain/matchLotto.js";
import { calculateWinningRate } from "../domain/calculateWinningRate.js";
import { LOTTO_CONDITION} from "../constants/constants.js";
import { purchaseLotto } from "../domain/purchaseLotto.js";


export const lottoService =  {
    purchaseLotto(purchaseMoney){
        return purchaseLotto(purchaseMoney)
    },

    calculateLottoResult(lottoList, winningLotto) {
        const lottoResult = new LottoResult();

        lottoList.forEach((lotto)=>{
                lottoResult.addRankingCount(calculateRank(matchLotto.winningNumbers(winningLotto, lotto), matchLotto.bonusNumber(winningLotto, lotto)))
        })

        return lottoResult
    },

    calculateWinningRate(lottoList, lottoResult){
        return calculateWinningRate(LOTTO_CONDITION.PRICE*lottoList.length,lottoResult.totalPrize)
    },
};
