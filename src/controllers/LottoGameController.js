import inputView from '../views/inputView.js';
import outputView from '../views/outputView.js';
import LottoGame from '../domains/LottoGame.js';

class LottoGameController {
  #lottoGame;

  startGame() {
    this.readLottosPrice();
  }

  async readLottosPrice() {
    const lottosPrice = await inputView.readLottosPrice();

    this.#lottoGame = new LottoGame(lottosPrice);
    this.printLottoNumbersList();
  }

  printLottoNumbersList() {
    const lottoNumbersList = this.#lottoGame.getLottoNumbersList();

    outputView.printLottoNumbersList(lottoNumbersList);
    this.readWinningNumbers();
  }

  async readWinningNumbers() {
    const luckyNumbers = await inputView.readLuckyNumbers();
    const bonusNumber = await inputView.readBonusNumber(luckyNumbers);
    this.#lottoGame.initWinningNumbers(luckyNumbers, bonusNumber);

    this.printStatistics();
  }

  printStatistics() {
    const amountOfRanks = this.#lottoGame.getAmountOfRanks();
    const profit = this.#lottoGame.calculateProfit();

    outputView.printStatistics(amountOfRanks, profit);
    this.readRetryCommand();
  }

  async readRetryCommand() {
    const retryCommand = await inputView.readRetry();

    this.#lottoGame.isRetry(retryCommand) ? this.startGame() : this.endGame();
  }

  endGame() {
    outputView.printGameEnd();
  }
}

export default LottoGameController;
