import InputView from '../view/InputView';
import LottoMachine from '../domain/LottoMachine';
import OutputView from '../view/OutputView';

class LottoController {
  async start() {
    const inputMoney = await InputView.readMoney();
    const lottoMachine = new LottoMachine(inputMoney);
    OutputView.printPurchasedLottoAmount(lottoMachine.count);
  }
}

export default LottoController;
