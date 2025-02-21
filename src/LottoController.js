import InputHandler from './input/InputHandler.js';
import OutputView from './view/OutputView.js';
import { LINE_BREAK, LOTTO_CONDITION, MESSAGE} from './constants/constants.js';
import { calculateRank } from './domain/calculateRank.js';
import LottoResult from './domain/LottoResult.js';
import WinningLotto from './domain/WinningLotto.js';
import { calculateTotalPrize } from './domain/calculateTotalPrize.js';
import { calculateWinningRate } from './domain/calculateWinningRate.js';
import { YES } from './constants/constants.js';
import { purchaseLotto } from './domain/purchaseLotto.js';
import { matchLotto } from './domain/matchLotto.js';

class LottoController {
  async run() {
    const lottoList = purchaseLotto(await InputHandler.purchaseMoney())
    this.printLottoNumber(lottoList);
    const winningNumbers = await InputHandler.winningNumbers();
    const bonusNumber = await InputHandler.bonusNumber(winningNumbers.numbers);

    const lottoResult = new LottoResult();
    const winningLotto = new WinningLotto(winningNumbers, bonusNumber)

    lottoList.forEach((lotto)=>{
      lotto.ranking = calculateRank(matchLotto.winningNumbers(winningLotto, lotto), matchLotto.bonusNumber(winningLotto, lotto))
      lottoResult.addRankingCount(lotto.ranking);
    })
    this.printStatstics(lottoResult)

    const winningRate = calculateWinningRate(LOTTO_CONDITION.PRICE*lottoList.length,calculateTotalPrize(lottoList))
    this.printWinningRate(winningRate)

    await this.reStart()
  }

  async reStart(){
    const reStart = await InputHandler.reStart();
    if(reStart===YES){
      return this.run();
    }
  }
  
  printStatstics(lottoResult){
    OutputView.print(MESSAGE.STATISTICS)
    OutputView.print(MESSAGE.LINE)
    const result = lottoResult.result
    OutputView.printLottoResult(result)
  } 

  printLottoNumber(lottoList){
    OutputView.print(lottoList.length+MESSAGE.PURCHASE_COUNT)
    lottoList.forEach((lotto)=>{
      OutputView.print(lotto.numbers);
    })
    OutputView.print(LINE_BREAK)
  }

  printWinningRate(winningRate){
    OutputView.print(`총 수익률은 ${winningRate}%입니다.`);
  }

}

export default LottoController;
