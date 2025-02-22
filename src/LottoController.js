import InputHandler from './input/InputHandler.js';
import OutputView from './view/OutputView.js';
import { LINE_BREAK, MESSAGE} from './constants/constants.js';
import WinningLotto from './domain/WinningLotto.js';
import { YES } from './constants/constants.js';
import { lottoService } from './lottoService.js';

class LottoController {
  async run() {
    const lottoList = lottoService.purchaseLotto(await InputHandler.purchaseMoney())
    OutputView.printLottoNumber(lottoList);

    const winningNumbers = await InputHandler.winningNumbers();
    const bonusNumber = await InputHandler.bonusNumber(winningNumbers.numbers);
    const winningLotto = new WinningLotto(winningNumbers, bonusNumber)

    const lottoResult = lottoService.calculateLottoResult(lottoList, winningLotto)
    OutputView.printStatstics(lottoResult)

    const winningRate = lottoService.calculateWinningRate(lottoList)
    OutputView.print(`총 수익률은 ${winningRate}%입니다.`)

    await this.reStart()
  }

  async reStart(){
    const reStart = await InputHandler.reStart();
    if(reStart===YES){
      return this.run();
    }
  }
}

export default LottoController;
