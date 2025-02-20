import InputHandler from './input/InputHandler.js';
import OutputView from './view/OutputView.js';
import { LINE_BREAK, LOTTO_CONDITION, MESSAGE, RANKING } from './constants/constants.js';
import LottoMatch from './domain/LottoMatch.js';
import { calculateRank } from './domain/calculateRank.js';
import LottoResult from './domain/LottoResult.js';
import { calculateTotalPrize } from './domain/calculateTotalPrize.js';
import { calculateWinningRate } from './domain/calculateWinningRate.js';
import { YES } from './constants/constants.js';
import { printLottoResult } from './utils/printLottoResult.js';
import { purchaseLotto } from './domain/purchaseLotto.js';

class LottoController {
  #lottoList
  #lottoResult

  async run() {
    this.#lottoList = purchaseLotto(await this.inputPurchaseMoney())
    this.printLottoNumber(this.#lottoList.length);
    const winningNumbers = await this.inputWinningNumbers();
    const bonusNumber = await this.inputBonusNumber(winningNumbers.numbers);
    
    const lottoMatch = new LottoMatch(winningNumbers, bonusNumber);
    this.#lottoResult = new LottoResult();

    this.calculateRank(lottoMatch)
    this.printStatstics()

    const winningRate = this.calculateWinningRate()
    this.printWinningRate(winningRate)

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

  calculateRank(lottoMatch){
    this.#lottoList.forEach((lotto)=>{
      lotto.ranking = calculateRank(lottoMatch.winningNumbers(lotto),lottoMatch.bonusNumber(lotto))
      this.#lottoResult.addRankingCount(lotto.ranking);
    })
  }

  calculateWinningRate(){
    return calculateWinningRate(LOTTO_CONDITION.PRICE*this.#lottoList.length,calculateTotalPrize(this.#lottoList))
  }

  async reStart(){
    const reStart = await InputHandler.reStart();
    if(reStart===YES){
      return this.run();
    }
  }
  
  printStatstics(){
    OutputView.print(MESSAGE.STATISTICS)
    OutputView.print(MESSAGE.LINE)
    const result = this.#lottoResult.result
    printLottoResult(result)
  } 

  printLottoNumber(){
    OutputView.print(this.#lottoList.length+MESSAGE.PURCHASE_COUNT)
    this.#lottoList.forEach((lotto)=>{
      OutputView.print(lotto.numbers);
    })
    OutputView.print(LINE_BREAK)
  }

  printWinningRate(winningRate){
    OutputView.print(`총 수익률은 ${winningRate}%입니다.`);
  }

}

export default LottoController;
