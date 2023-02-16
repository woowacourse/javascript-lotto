import LottoMachine from './domain/LottoMachine';
import InputView from './view/console/InputView';
import OutputView from './view/console/OutputView';

class LottoController {
  #lottoMachine;

  async readBuyMoney() {
    try {
      const money = await InputView.readBuyMoney();
      this.#lottoMachine = new LottoMachine(money);
    } catch (error) {
      OutputView.printErrorMsg(error.message);
      await this.readBuyMoney();
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
      OutputView.printErrorMsg(error.message);
      await this.readWinNumbers();
    }
  }

  async readBonusNumber() {
    try {
      const bonusNumber = await InputView.readBonusNumber();
      this.#lottoMachine.setBonusNumber(bonusNumber);
    } catch (error) {
      OutputView.printErrorMsg(error.message);
      await this.readBonusNumber();
    }
  }

  printWinStatistics() {
    OutputView.printWinStatistics(this.#lottoMachine.calcStatstics());
  }
}

export default LottoController;
