import InputHandler from './input/InputHandler.js';
import LottoMaker from './domain/LottoMaker.js';
import OutputView from './view/OutputView.js';
import { LINE_BREAK, LOTTO_CONDITION, MESSAGE, RANKING } from './constants/constants.js';
import LottoMatch from './domain/LottoMatch.js';
import { calculateRank } from './domain/calculateRank.js';
import LottoResult from './domain/LottoResult.js';
import { calculateTotalPrize } from './domain/calculateTotalPrize.js';
import { calculateWinningRate } from './domain/calculateWinningRate.js';
import { YES } from './constants/constants.js';

class LottoController {
  async run() {
    const lottoMaker = new LottoMaker(await this.inputPurchaseMoney())
    this.printLottoNumber(lottoMaker);
    const winningNumbers = await this.inputWinningNumbers();
    const bonusNumber = await this.inputBonusNumber(winningNumbers.numbers);
    const lottoList = lottoMaker.lottoList;
    
    const lottoMatch = new LottoMatch(winningNumbers, bonusNumber);
    const lottoResult = new LottoResult();
    lottoList.forEach((lotto)=>{
      lotto.ranking = calculateRank(lottoMatch.winningNumbers(lotto),lottoMatch.bonusNumber(lotto))
      lottoResult.addRankingCount(lotto.ranking);
    })
    OutputView.print(MESSAGE.STATISTICS)
    OutputView.print(MESSAGE.LINE)
    const result = lottoResult.result
    OutputView.print(`${RANKING.FIFTH.MATCH_COUNT}개 일치 ${RANKING.FIFTH.PRIZE.toLocaleString()}원) - ${result[5]}개\n${RANKING.FOURTH.MATCH_COUNT}개 일치 (${RANKING.FOURTH.PRIZE.toLocaleString()}원) - ${result[4]}개\n${RANKING.THIRD.MATCH_COUNT}개 일치 (${RANKING.THIRD.PRIZE.toLocaleString()}원) - ${result[3]}개\n${RANKING.SECOND.MATCH_COUNT}개 일치, 보너스 볼 일치 (${RANKING.SECOND.PRIZE.toLocaleString()}원) - ${result[2]}개\n${RANKING.FIRST.MATCH_COUNT}개 일치 (${RANKING.FIRST.PRIZE.toLocaleString()}원) - ${result[1]}개\n`)
    const winningRate = calculateWinningRate(LOTTO_CONDITION.PRICE*lottoMaker.purchaseCount,calculateTotalPrize(lottoList))
    OutputView.print(`총 수익률은 ${winningRate}%입니다.`);

    await this.reStart()
  }


  async inputPurchaseMoney(){
    return await InputHandler.purchaseMoney();
  }

  async inputWinningNumbers(){
    return await InputHandler.winningNumbers()
  }

  async inputBonusNumber(winningNumbers){
    return await InputHandler.bonusNumber(winningNumbers)
  }

  printLottoNumber(lottoMaker){
    OutputView.print(lottoMaker.purchaseCount+MESSAGE.PURCHASE_COUNT)
    lottoMaker.lottoList.forEach((lotto)=>{
      OutputView.print(lotto.numbers);
    })
    OutputView.print(LINE_BREAK)
  }

  async reStart(){
    const reStart = await InputHandler.reStart();
    if(reStart===YES){
      return this.run();
    }
  }

}

export default LottoController;
