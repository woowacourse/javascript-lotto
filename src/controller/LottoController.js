import InputView from '../view/InputView';
import LottoMachine from '../domain/LottoMachine';
import OutputView from '../view/OutputView';
import Money from '../domain/Money';
import { retryOnInvalidInput } from '../util/retryOnInvalidInput';

class LottoController {
  #lottoMachine;
  #money;

  async start() {
    await retryOnInvalidInput(async () => {
      await this.#insertMoney();
    });

    this.#lottoMachine = new LottoMachine(this.#money);
    OutputView.printPurchasedLottoAmount(this.#lottoMachine.count);
    this.#lottoMachine.lottos.forEach(lotto => {
      OutputView.printLottoNumbers(lotto.lottoNumbers);
    });
  }

  async #insertMoney() {
    const inputMoney = await InputView.readMoney();
    const validatedMoney = new Money(inputMoney);

    this.#money = validatedMoney;
  }
}

export default LottoController;
