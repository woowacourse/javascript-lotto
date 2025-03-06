import InputView from '../View/InputView.js';
import OutputView from '../View/OutputView.js';
import Validate from '../Model/Validate.js';
import LottoMachine from '../Model/LottoMachine.js';
import Winning from '../Model/Winning.js';

class LottoController {
  async start() {
    const { price, lottos } = await this.#buyLotto();
    const winning = await this.#getWinningNumbers();

    this.#processWinningResult(winning, lottos);
    this.#processPrizeResult(winning, price);

    const restart = await this.#readRestart();
    return this.#runRestart(restart);
  }

  #runRestart(restart) {
    if (restart === 'y' || restart === 'Y') {
      this.start();
    }
  }

  async #buyLotto() {
    const lottoMachine = new LottoMachine();
    const price = await this.#readPrice();
    const lottos = lottoMachine.generateLotto(price);
    OutputView.printLottos(lottos);
    return { price, lottos };
  }

  async #getWinningNumbers() {
    const winning = await this.#readWinningNumbers();
    const bonusNumber = await this.#readBonusNumber(winning);

    winning.setBonusNumber(bonusNumber);
    return winning;
  }

  #processWinningResult(winning, lottos) {
    winning.calculateRank(lottos);
    OutputView.printWinningHistory(winning.rankHistory);
  }

  #processPrizeResult(winning, price) {
    const prizeRate = winning.getCalculatedPrizeRate(price);
    OutputView.printPrizeRate(prizeRate);
  }

  async #readPrice() {
    while (true) {
      try {
        const price = await InputView.readPrice();
        Validate.validatePrice(price);
        return price;
      } catch (error) {
        OutputView.printErrorMessage(error.message);
      }
    }
  }

  async #readWinningNumbers() {
    while (true) {
      try {
        const winningNumbers = await InputView.readWinningNumbers();
        Validate.checkIsEmpty(winningNumbers);
        return new Winning(winningNumbers.split(','));
      } catch (error) {
        OutputView.printErrorMessage(error.message);
      }
    }
  }

  async #readBonusNumber(winning) {
    while (true) {
      try {
        const bonusNumber = await InputView.readBonusNumbers();
        Validate.checkIsEmpty(bonusNumber);
        winning.validateBonusNumber(bonusNumber);
        return Number(bonusNumber);
      } catch (error) {
        OutputView.printErrorMessage(error.message);
      }
    }
  }

  async #readRestart() {
    try {
      const restart = await InputView.readRestart();
      Validate.checkRestartChar(restart);
      return restart;
    } catch (error) {
      OutputView.printErrorMessage(error.message);
      return this.#readRestart();
    }
  }
}

export default LottoController;
