import InputHandler from './input/InputHandler.js';
import LottoMaker from './domain/LottoMaker.js';
import OutputView from './view/OutputView.js';
import { MESSAGE } from './constants/constants.js';

class LottoController {
  async run() {
    const lottoMaker = new LottoMaker(await this.inputPurchaseMoney())
    this.printLottoNumber(lottoMaker)
  }

  async inputPurchaseMoney(){
    return await InputHandler.getPurchaseMoney();
  }

  printLottoNumber(lottoMaker){
    OutputView.print(lottoMaker.purchaseCount+MESSAGE.PURCHASE_COUNT)
    lottoMaker.lottoList.forEach((lotto)=>{
      OutputView.print(lotto.numbers);
    })
  }  
}

export default LottoController;
