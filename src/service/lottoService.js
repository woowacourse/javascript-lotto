import { calculateRank } from "../domain/calculateRank.js";
import LottoResult from "../domain/LottoResult.js";
import { matchLotto } from "../domain/matchLotto.js";
import { calculateWinningRate } from "../domain/calculateWinningRate.js";
import { LOTTO_CONDITION} from "../constants/constants.js";
import { purchaseLotto } from "../domain/purchaseLotto.js";
import WinningLotto from "../domain/WinningLotto.js";
import { lottoController } from "../controller/lottoController.js";


export const lottoService =  {
    purchaseLotto(purchaseMoney){
        return purchaseLotto(purchaseMoney)
    },

    calculateLottoResult(lottoList, winningLotto) {
        const rankingList = lottoList.map((lotto)=>{
            return calculateRank(matchLotto.winningNumbers(winningLotto, lotto), matchLotto.bonusNumber(winningLotto, lotto))
        })
       return new LottoResult(rankingList)
    },

    calculateWinningRate(lottoList, lottoResult){
        return calculateWinningRate(LOTTO_CONDITION.PRICE*lottoList.length,lottoResult.totalPrize)
    },

    async createWinningLotto(winningNumbers) {
        try {
          const bonusNumber = Number(await lottoController.inputBonusNumber());
          const winningLotto = new WinningLotto(winningNumbers, bonusNumber)
          return winningLotto
        } catch (e) {
          lottoController.printErrorMessage(e.message)
          return await this.createWinningLotto(winningNumbers)
        }
    },
};
