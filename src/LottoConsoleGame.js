import { LOTTO, RANKING_THRESHOLD, GAME_COMMAND } from './constants';
import lottoGameCalculator from './domain/lottoGameCalculator';
import lottoGameValidator from './domain/lottoGameValidator';
import Lotto from './domain/models/Lotto';
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

    this.decideReplay(await this.readGameCommand());
  }

  buyLottos(purchaseAmount) {
    while (this.#lottos.length < purchaseAmount / LOTTO.price) {
      this.#lottos.push(this.buyLotto());
    }
  }

  buyLotto() {
    const randomNumbers = Array.from({ length: LOTTO.maxNumber }, (_, i) => i + LOTTO.minNumber)
      .sort(() => Math.random() - 0.5)
      .slice(0, LOTTO.numbersLength)
      .sort((a, b) => a - b);

    return new Lotto(randomNumbers);
  }

  makeRankings(winningNumbers, bonusNumber) {
    return this.#lottos
      .filter((lotto) => lotto.calculateMatchCount(winningNumbers) >= RANKING_THRESHOLD)
      .map((lotto) =>
        lotto.calculateRanking(lotto.calculateMatchCount(winningNumbers), bonusNumber)
      );
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
    if (gameCommand === GAME_COMMAND.yes) {
      this.#lottos = [];
      this.play();
    } else {
      this.#io.close();
    }
  }

  async readPurchaseAmount() {
    const pruchaseAmount = await this.#io.read('\n> 구입금액을 입력해 주세요.');
    try {
      lottoGameValidator.checkPurchaseAmount(pruchaseAmount);
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

export default LottoConsoleGame;
