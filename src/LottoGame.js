import lottoGameCalculator from './domain/lottoGameCalculator.js';
import lottoGameValidator from './domain/lottoGameValidator.js';
import Lotto from './domain/models/Lotto.js';
import generateRandomNumber from './utils/generateRandomNumber.js';
import Interface from './view/Interface.js';
import outputView from './view/outputView.js';

class LottoGame {
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

    this.decideReplay(await this.readGameCommand());
  }

  buyLottos(purchaseAmount) {
    while (this.#lottos.length < purchaseAmount / 1000) {
      this.#lottos.push(this.buyLotto());
    }
  }

  buyLotto() {
    const randomNumbers = [];
    while (randomNumbers.length < 6) {
      const randomNumber = generateRandomNumber(1, 45);
      if (!randomNumbers.includes(randomNumber)) randomNumbers.push(randomNumber);
    }

    return new Lotto(randomNumbers.sort((a, b) => a - b));
  }

  makeRankings(winningNumbers, bonusNumber) {
    const rankings = [];
    this.#lottos.forEach((lotto) => {
      const matchCount = lotto.calculateMatchCount(winningNumbers);
      if (matchCount >= 3) rankings.push(lotto.calculateRanking(matchCount, bonusNumber));
    });

    return rankings;
  }

  printLottos() {
    outputView.printLottos(this.#lottos.map((lotto) => lotto.getNumbers()));
  }

  printStatistics(purchaseAmount, rankings) {
    outputView.printStatistics(
      rankings,
      lottoGameCalculator.calculateRewardRate(purchaseAmount, rankings)
    );
  }

  decideReplay(gameCommand) {
    if (gameCommand === 'y') {
      this.#lottos = [];
      this.play();
    } else {
      this.#io.close();
    }
  }

  async readPurchaseAmount() {
    const pruchaseAmount = await this.#io.read('\n> 구입금액을 입력해 주세요.');
    try {
      lottoGameValidator.checkPruchaseAmount(pruchaseAmount);
      return Number(pruchaseAmount);
    } catch (error) {
      outputView.printErrorMessage(error);
      return this.readPurchaseAmount();
    }
  }

  async readWinningNumbers() {
    const winningNumbers = await this.#io.read('\n> 당첨 번호를 입력해 주세요. ');
    try {
      lottoGameValidator.checkWinningNumbers(winningNumbers);
      return winningNumbers.split(',').map(Number);
    } catch (error) {
      outputView.printErrorMessage(error);
      return this.readWinningNumbers();
    }
  }

  async readBonusNumber(winningNumbers) {
    const bonusNumber = await this.#io.read('\n> 보너스 번호를 입력해 주세요. ');
    try {
      lottoGameValidator.checkBonusNumber(bonusNumber, winningNumbers);
      return Number(bonusNumber);
    } catch (error) {
      outputView.printErrorMessage(error);
      return this.readBonusNumber(winningNumbers);
    }
  }

  async readGameCommand() {
    const gameCommand = await this.#io.read('\n> 다시 시작하시겠습니까? (y/n) ');
    try {
      lottoGameValidator.checkGameCommand(gameCommand);
      return gameCommand;
    } catch (error) {
      outputView.printErrorMessage(error);
      return this.readGameCommand();
    }
  }
}

export default LottoGame;
