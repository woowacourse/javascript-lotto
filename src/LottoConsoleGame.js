import { LOTTO, RANKING_THRESHOLD, GAME_COMMAND, MESSAGE } from './constants';
import lottoGameCalculator from './domain/lottoGameCalculator';
import lottoGameValidator from './domain/lottoGameValidator';
import Lotto from './domain/models/Lotto';
import generateRandomNumber from './utils/generateRandomNumber';
import Interface from './view/Interface';
import outputView from './view/outputView';

class LottoConsoleGame {
  #io;
  #lottos;

  constructor() {
    this.#io = new Interface();
    this.#lottos = [];
  }

  async play() {
    const pruchaseAmount = await this.readPurchaseAmount();
    this.buyLottos(pruchaseAmount);
    this.printLottos();

    const winningNumbers = await this.readWinningNumbers();
    const bonusNumber = await this.readBonusNumber(winningNumbers);
    this.printStatistics(pruchaseAmount, this.makeRankings(winningNumbers, bonusNumber));

    const gameCommand = await this.readGameCommand();
    this.decideReplay(gameCommand);
  }

  buyLottos(purchaseAmount) {
    while (this.#lottos.length < purchaseAmount / LOTTO.price) {
      this.#lottos.push(this.buyLotto());
    }
  }

  buyLotto() {
    const randomNumbers = [];
    while (randomNumbers.length < LOTTO.numbersLength) {
      const randomNumber = generateRandomNumber(LOTTO.minNumber, LOTTO.maxNumber);
      if (!randomNumbers.includes(randomNumber)) randomNumbers.push(randomNumber);
    }

    randomNumbers.sort((a, b) => a - b);

    return new Lotto(randomNumbers);
  }

  makeRankings(winningNumbers, bonusNumber) {
    const rankings = [];
    this.#lottos.forEach((lotto) => {
      const matchCount = lotto.calculateMatchCount(winningNumbers);
      if (matchCount < RANKING_THRESHOLD) return;
      const ranking = lotto.calculateRanking(matchCount, bonusNumber);
      rankings.push(ranking);
    });

    return rankings;
  }

  printLottos() {
    const lottosNumbers = this.#lottos.map((lotto) => lotto.getNumbers());
    outputView.printLottos(lottosNumbers);
  }

  printStatistics(purchaseAmount, rankings) {
    const rewardRate = lottoGameCalculator.calculateRewardRate(purchaseAmount, rankings);
    outputView.printStatistics(rankings, rewardRate);
  }

  decideReplay(gameCommand) {
    if (gameCommand === GAME_COMMAND.yes) {
      this.#lottos = [];
      this.play();
    } else {
      this.#io.close();
    }
  }

  async readPurchaseAmount() {
    const pruchaseAmount = await this.#io.read(MESSAGE.requestPruchaseAmount);
    try {
      lottoGameValidator.checkPruchaseAmount(pruchaseAmount);
      return Number(pruchaseAmount);
    } catch (error) {
      outputView.printErrorMessage(error);
      return this.readPurchaseAmount();
    }
  }

  async readWinningNumbers() {
    const winningNumbers = await this.#io.read(MESSAGE.requestWinningNumbers);
    try {
      lottoGameValidator.checkWinningNumbers(winningNumbers);
      return winningNumbers.split(',').map(Number);
    } catch (error) {
      outputView.printErrorMessage(error);
      return this.readWinningNumbers();
    }
  }

  async readBonusNumber(winningNumbers) {
    const bonusNumber = await this.#io.read(MESSAGE.requestBonusNumber);
    try {
      lottoGameValidator.checkBonusNumber(bonusNumber, winningNumbers);
      return Number(bonusNumber);
    } catch (error) {
      outputView.printErrorMessage(error);
      return this.readBonusNumber(winningNumbers);
    }
  }

  async readGameCommand() {
    const gameCommand = await this.#io.read(MESSAGE.requestGameCommand);
    try {
      lottoGameValidator.checkGameCommand(gameCommand);
      return gameCommand;
    } catch (error) {
      outputView.printErrorMessage(error);
      return this.readGameCommand();
    }
  }
}

export default LottoConsoleGame;
