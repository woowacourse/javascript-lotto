import LottoMachine from './domain/LottoMachine';
import InputView from './view/console/InputView';
import OutputView from './view/console/OutputView';

class LottoController {
  #lottoMachine;

  handlePayments(payments) {
    this.#lottoMachine = new LottoMachine(payments);
  }

  handleWinNumbers(winNumbers) {
    this.#lottoMachine.generateWinningLotto(winNumbers);
  }

  handleBonusNumber(bonusNumber) {
    this.#lottoMachine.setBonusNumber(bonusNumber);
  }

  async readPayments() {
    try {
      const money = await InputView.readPayments();
      this.handlePayments(money);
    } catch (error) {
      OutputView.printErrorMsg(error.message);
      await this.readPayments();
    }
  }

  async readWinNumbers() {
    try {
      const winNumbers = await InputView.readWinNumbers();
      this.handleWinNumbers(winNumbers);
    } catch (error) {
      OutputView.printErrorMsg(error.message);
      await this.readWinNumbers();
    }
  }

  async readBonusNumber() {
    try {
      const bonusNumber = await InputView.readBonusNumber();
      this.handleBonusNumber(bonusNumber);
    } catch (error) {
      OutputView.printErrorMsg(error.message);
      await this.readBonusNumber();
    }
  }

  printBuyLottos() {
    const lottoNumbers = this.#lottoMachine.getLottoNumbers();
    OutputView.printBuyLottos(lottoNumbers);
  }

  printWinStatistics() {
    OutputView.printWinStatistics(this.#lottoMachine.calcStatstics());
  }
}

export default LottoController;
