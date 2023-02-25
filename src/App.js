import InputView from './view/InputView.js';
import LottoGame from './domain/LottoGame.js';
import Console from './util/Console.js';
import OutputView from './view/OutputView.js';
import LottoGameCalculator from './domain/LottoGameCalculator.js';

class App {
  #lottoGame;

  async play() {
    const money = await this.readUserInput(InputView.readMoney);
    this.#lottoGame = new LottoGame(money);
    this.printBuyResult(money);

    const { winningNumbers, bonusNumber } = await this.readWinningLotto();
    this.printGameResult(winningNumbers, bonusNumber);

    await this.retry();
  }

  async retry() {
    const retry = await this.readUserInput(InputView.readRetry);

    if (retry === 'y') await this.play();

    OutputView.close();
  }

  printGameResult(winningNumbers, bonusNumber) {
    const rankingBoard = this.#lottoGame
      .updateRankingBoard(winningNumbers, bonusNumber)
      .getRankingBoard();

    const earningRate = this.#lottoGame.getEarningRate();

    OutputView.printResult(rankingBoard, earningRate);
  }

  async readWinningLotto() {
    const winningNumbers = await this.readUserInput(InputView.readWinningNumbers);
    const bonusNumber = await this.readUserInput(InputView.readBonusNumber, winningNumbers);
    return { winningNumbers, bonusNumber };
  }

  printBuyResult(money) {
    OutputView.printTheChange(LottoGameCalculator.getTheChange(money));
    OutputView.printLottos(this.#lottoGame.getLottos());
  }

  async readUserInput(inputFunction, functionParameter) {
    try {
      return await inputFunction(functionParameter);
    } catch (e) {
      Console.print(e.message);
      return this.readUserInput(inputFunction, functionParameter);
    }
  }
}

export default App;
