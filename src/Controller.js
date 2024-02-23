import InputView from './View/InputView';
import OutputView from './View/OutputView';
import LottoMachine from './Domain/LottoMachine';
import WinLottoNumber from './Domain/WinLottoNumber';

export default class Controller {
  #lottoMachine;

  #winLottoNumber;

  async run() {
    await this.#executeLottoMoney();
    this.#executeLottos();

    await this.#executeWinLottoNumber();
    this.#executeResult();

    await this.#executeRetry();
  }

  async #executeLottoMoney() {
    try {
      const money = await InputView.readMoney();
      this.#lottoMachine = new LottoMachine(money);
    } catch (err) {
      OutputView.printError(err.message);
      await this.#executeLottoMoney();
    }
  }

  #executeLottos() {
    const boughtLottos = this.#lottoMachine.getLottos();
    OutputView.printBoughtLottos(boughtLottos);
  }

  async #executeWinLottoNumber() {
    await this.#executeWinLottoNumbers();
    await this.#executeBonusNumber();
  }

  async #executeWinLottoNumbers() {
    try {
      const winLottoNumbers = await InputView.readWinLottoNumbers();
      this.#winLottoNumber = new WinLottoNumber(winLottoNumbers);
    } catch (err) {
      OutputView.printError(err.message);
      await this.#executeWinLottoNumbers();
    }
  }

  async #executeBonusNumber() {
    try {
      const bonusNumber = await InputView.readBonusNumber();
      this.#winLottoNumber.setBonusNumber(bonusNumber);
    } catch (err) {
      OutputView.printError(err.message);
      await this.#executeBonusNumber();
    }
  }

  #executeResult() {
    const winNumbersObj = this.#winLottoNumber.getWinLottoNumbers();
    const winLottos = this.#lottoMachine.getWinLottos(winNumbersObj);
    OutputView.printWinLottos(winLottos);

    const rateOfIncome = this.#lottoMachine.getRateOfIncome();
    OutputView.printRateOfIncome(rateOfIncome);
  }

  async #executeRetry() {
    try {
      const isRetry = await InputView.readIsRetryRun();
      await this.#initializeApp(isRetry);
    } catch (error) {
      OutputView.printError(error.message);
      await this.#executeRetry();
    }
  }

  async #initializeApp(isRetry) {
    if (!isRetry) return;
    this.#lottoMachine = undefined;
    this.#winLottoNumber = undefined;
    await this.run();
  }
}
