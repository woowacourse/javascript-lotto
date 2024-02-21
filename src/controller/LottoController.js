import InputView from '../view/InputView';
import LottoMachine from '../domain/LottoMachine';
import OutputView from '../view/OutputView';
import Money from '../domain/Money';

class LottoController {
  #lottoMachine;

  async start() {
    const inputMoney = await InputView.readMoney();
    const validatedMoney = new Money(inputMoney);

    this.#lottoMachine = new LottoMachine(validatedMoney);
    OutputView.printPurchasedLottoAmount(this.#lottoMachine.count);
    this.#lottoMachine.lottos.forEach(lotto => {
      OutputView.printLottoNumbers(lotto.lottoNumbers);
    });
  }
}

export default LottoController;
