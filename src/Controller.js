import InputView from './View/InputView';
import OutputView from './View/OutputView';
import LottoMachine from './Domain/LottoMachine';
import WinLottoNumber from './Domain/WinLottoNumber';

export default class Controller {
  #lottoMachine;

  #winLottoNumber;

  async run() {
    await this.#handleLottoMoney();
    this.#handleLottos();

    await this.#handleWinLottoNumber();
    this.#handleResult();

    await this.#handleRetry();
  }

  async #handleLottoMoney() {
    try {
      const money = await InputView.readMoney();
      this.#lottoMachine = new LottoMachine(money);
    } catch (err) {
      OutputView.printError(err.message);
      await this.#handleLottoMoney();
    }
  }

  #handleLottos() {
    const boughtLottos = this.#lottoMachine.getLottos();
    OutputView.printBoughtLottos(boughtLottos);
  }

  async #handleWinLottoNumber() {
    await this.#handleWinLottoNumbers();
    await this.#handleBonusNumber();
  }

  async #handleWinLottoNumbers() {
    try {
      const winLottoNumbers = await InputView.readWinLottoNumbers();
      this.#winLottoNumber = new WinLottoNumber(winLottoNumbers);
    } catch (err) {
      OutputView.printError(err.message);
      await this.#handleWinLottoNumbers();
    }
  }

  async #handleBonusNumber() {
    try {
      const bonusNumber = await InputView.readBonusNumber();
      this.#winLottoNumber.setBonusNumber(bonusNumber);
    } catch (err) {
      OutputView.printError(err.message);
      await this.#handleBonusNumber();
    }
  }

  #handleResult() {
    const winNumbersObj = this.#winLottoNumber.getWinLottoNumbers();
    const winLottos = this.#lottoMachine.getWinLottos(winNumbersObj);
    OutputView.printWinLottos(winLottos);

    const rateOfIncome = this.#lottoMachine.getRateOfIncome();
    OutputView.printRateOfIncome(rateOfIncome);
  }

  async #handleRetry() {
    const isRetry = await InputView.readIsRetryRun();

    if (isRetry) {
      this.#lottoMachine = undefined;
      this.#winLottoNumber = undefined;
      await this.run();
    }
  }
}
