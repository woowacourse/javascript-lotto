import InputHandler from './input/InputHandler.js';
import OutputView from './view/OutputView.js';
import { LINE_BREAK, MESSAGE} from './constants/constants.js';
import WinningLotto from './domain/WinningLotto.js';
import { YES } from './constants/constants.js';
import { lottoService } from './lottoService.js';

class LottoController {
  async run() {
    const lottoList = lottoService.purchaseLotto(await InputHandler.purchaseMoney())
    this.printLottoNumber(lottoList);

    const winningNumbers = await InputHandler.winningNumbers();
    const bonusNumber = await InputHandler.bonusNumber(winningNumbers.numbers);
    const winningLotto = new WinningLotto(winningNumbers, bonusNumber)

    const lottoResult = lottoService.calculateLottoResult(lottoList, winningLotto)
    this.printStatstics(lottoResult)

    const winningRate = lottoService.calculateWinningRate(lottoList)
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
