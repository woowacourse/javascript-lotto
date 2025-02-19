import InputHandler from './input/InputHandler.js';
import LottoMaker from './domain/LottoMaker.js';
import OutputView from './view/OutputView.js';
import { LINE_BREAK, MESSAGE } from './constants/constants.js';

class LottoController {
  async run() {
    const lottoMaker = new LottoMaker(await this.inputPurchaseMoney())
    this.printLottoNumber(lottoMaker);
    const winningNumbers = await this.inputWinningNumbers();
    const bonusNumber = await this.inputBonusNumber(winningNumbers.numbers);
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
}

export default LottoController;
