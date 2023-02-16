import LottoMachine from './domain/LottoMachine';
import InputView from './view/console/InputView';
import OutputView from './view/console/OutputView';

class LottoController {
  static RESTART_COMMAND = 'y';
  static EXIT_COMMAND = 'n';

  #lottoMachine;

  async readMoney() {
    try {
      const money = await InputView.readMoney();
      this.#lottoMachine = new LottoMachine(money);
    } catch (error) {
      OutputView.printError(error);
      await this.readMoney();
    }
  }

  printBuyLottos() {
    const lottoNumbers = this.#lottoMachine.getLottoNumbers();
    OutputView.printBuyLottos(lottoNumbers);
  }

  async readWinNumbers() {
    try {
      const winNumbers = await InputView.readWinNumbers();
      this.#lottoMachine.generateWinningLotto(winNumbers);
    } catch (error) {
      OutputView.printError(error);
      await this.readWinNumbers();
    }
  }

  async readBonusNumber() {
    try {
      const bonusNumber = await InputView.readBonusNumber();
      this.#lottoMachine.setBonusNumber(bonusNumber);
    } catch (error) {
      OutputView.printError(error);
      await this.readBonusNumber();
    }
  }

  printWinStatistics() {
    OutputView.printWinStatistics(this.#lottoMachine.calcStatstics());
  }
}

export default LottoController;
