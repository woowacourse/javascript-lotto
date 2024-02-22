import InputView from "./View/InputView";
import OutputView from "./View/OutputView";
import LottoMachine from "./Domain/LottoMachine";
import WinLottoNumber from "./Domain/WinLottoNumber";

export default class Controller {
  #lottoMachine;

  #winLottoNumber;

  async run() {
    await this.#generateLottoMoney();
    this.#generateLottos();

    await this.#generateWinLottoNumber();
    this.#generateResult();
  }

  async #generateLottoMoney() {
    try {
      const money = await InputView.readMoney();
      this.#lottoMachine = new LottoMachine(money);
    } catch (err) {
      OutputView.printError(err.message);
      await this.#generateLottoMoney();
    }
  }

  #generateLottos() {
    const boughtLottos = this.#lottoMachine.getLottos();
    OutputView.printBoughtLottos(boughtLottos);
  }

  async #generateWinLottoNumber() {
    await this.#generateWinLottoNumbers();
    await this.#generateBonusNumber();
  }

  async #generateWinLottoNumbers() {
    try {
      const winLottoNumbers = await InputView.readWinLottoNumbers();
      this.#winLottoNumber = new WinLottoNumber(winLottoNumbers);
    } catch (err) {
      OutputView.printError(err.message);
      await this.#generateWinLottoNumbers();
    }
  }

  async #generateBonusNumber() {
    try {
      const bonusNumber = await InputView.readBonusNumber();
      this.#winLottoNumber.setBonusNumber(bonusNumber);
    } catch (err) {
      OutputView.printError(err.message);
      await this.#generateBonusNumber();
    }
  }

  #generateResult() {
    const winNumbersObj = this.#winLottoNumber.getWinLottoNumbers();
    const winLottos = this.#lottoMachine.getWinLottos(winNumbersObj);
    OutputView.printWinLottos(winLottos);

    const rateOfIncome = this.#lottoMachine.getRateOfIncome();
    OutputView.printRateOfIncome(rateOfIncome);
  }
}
