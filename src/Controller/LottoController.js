import InputView from '../View/InputView.js';
import OutputView from '../View/OutputView.js';
import Validate from '../Model/Validate.js';
import LottoMachine from '../Model/LottoMachine.js';
import Winning from '../Model/Winning.js';

class LottoController {
  async start() {
    const lottoMachine = new LottoMachine();
    const price = await this.#readPrice();

    const lottos = lottoMachine.generateLotto(price);
    OutputView.printLottos(lottos);

    const winningNumbers = await this.#readWinningNumbers();
    const bonusNumber = await this.#readBonusNumber(winningNumbers);

    const winning = new Winning(winningNumbers, bonusNumber);
    winning.calculateRank(lottos);
    OutputView.printWinningHistory(winning.rankHistory);

    const prizeRate = winning.getCalculatedPrizeRate(price);
    OutputView.printPrizeRate(prizeRate);
  }

  async #readPrice() {
    while (true) {
      try {
        const price = await InputView.readPrice();
        this.#validatePrice(price);
        return price;
      } catch (error) {
        OutputView.printErrorMessage(error.message);
      }
    }
  }

  #validatePrice(price) {
    try {
      Validate.checkIsEmpty(price);
      Validate.checkIsNumber(price);
      Validate.checkThousandUnit(price);
      Validate.checkPriceRange(price);
    } catch (error) {
      throw error;
    }
  }

  async #readWinningNumbers() {
    try {
      const winningNumbers = await InputView.readWinningNumbers();
      this.#validateWinningNumbers(winningNumbers);
      return winningNumbers.split(',').map(Number);
    } catch (error) {
      OutputView.printErrorMessage(error.message);
    }
  }

  #validateWinningNumbers(numbers) {
    try {
      Validate.checkIsEmpty(numbers);
      const winningNumbers = numbers.split(',');
      winningNumbers.forEach((winningNumber) => {
        Validate.checkIsEmpty(winningNumber);
        Validate.checkIsNumber(winningNumber);
        Validate.checkLottoNumberRange(winningNumber);
      });
      Validate.checkWinningNumberDuplicate(winningNumbers);
    } catch (error) {
      throw error;
    }
  }

  async #readBonusNumber(winningNumbers) {
    try {
      const bonusNumber = await InputView.readBonusNumbers();
      this.#validateBonusNumber(bonusNumber, winningNumbers);
      return Number(bonusNumber);
    } catch (error) {
      OutputView.printErrorMessage(error);
    }
  }

  #validateBonusNumber(bonusNumber, winningNumbers) {
    try {
      Validate.checkIsEmpty(bonusNumber);
      Validate.checkIsNumber(bonusNumber);
      Validate.checkLottoNumberRange(bonusNumber);
      Validate.checkBonusNumberDuplicate(winningNumbers, bonusNumber);
    } catch (error) {
      throw error;
    }
  }
}

export default LottoController;
