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

    await retryOnInvalidInput(async () => {
      await this.#insertWinnigNumbers();
    });

    await retryOnInvalidInput(async () => {
      await this.#insertBonusNumbers();
    });
  }

  async #insertMoney() {
    const inputMoney = await InputView.readMoney();
    const validatedMoney = new Money(inputMoney);

    this.#money = validatedMoney;
  }

  async #insertWinnigNumbers() {
    const inputWinningNumber = await InputView.readWinnigNumbers();

    this.#lottoMachine.winningLotto = inputWinningNumber;
  }

  async #insertBonusNumbers() {
    const inputBonusNumber = await InputView.readBonusNumber();

    this.#lottoMachine.bonusNumber = inputBonusNumber;
  }
}

export default LottoController;
