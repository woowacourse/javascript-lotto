import InputView from '../view/InputView';
import LottoMachine from '../domain/LottoMachine';
import OutputView from '../view/OutputView';

class LottoController {
  #lottoMachine;

  async start() {
    const inputMoney = await InputView.readMoney();
    this.#lottoMachine = new LottoMachine(inputMoney);
    OutputView.printPurchasedLottoAmount(this.#lottoMachine.count);
    this.#lottoMachine.lottos.forEach(lotto => {
      OutputView.printLottoNumbers(String(lotto.lottoNumbers).split(',').join(', '));
    });
  }
}

export default LottoController;
