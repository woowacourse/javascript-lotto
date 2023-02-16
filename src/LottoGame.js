import lottoGameCalculator from './domain/lottoGameCalculator.js';
import lottoGameValidator from './domain/lottoGameValidator.js';
import Lotto from './domain/models/Lotto.js';
import generateRandomNumber from './utils/generateRandomNumber.js';
import Interface from './view/Interface.js';
import outputView from './view/outputView.js';

class LottoGame {
  #lottos;
  #io;

  constructor() {
    this.#lottos = [];
    this.#io = new Interface();
  }

  async play() {
    const purchaseAmount = await this.readPurchaseAmount();
    const buyCount = purchaseAmount / 1000;
    while (this.#lottos.length < buyCount) {
      this.#lottos.push(this.buyLotto());
    }

    outputView.printLottos(this.#lottos.map((lotto) => lotto.getNumbers()));
    outputView.printNewLine();
    const winningNumbers = await this.readWinningNumbers();
    outputView.printNewLine();
    const bonusNumber = await this.readBonusNumber(winningNumbers);
    outputView.printNewLine();
    const rankings = this.makeRankings(winningNumbers, bonusNumber);
    outputView.printStatistics(
      rankings,
      lottoGameCalculator.calculateRewardRate(purchaseAmount, rankings)
    );
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

  async readPurchaseAmount() {
    const pruchaseAmount = await this.#io.read('> 구입금액을 입력해 주세요.');
    try {
      lottoGameValidator.checkPruchaseAmount(pruchaseAmount);
      return Number(pruchaseAmount);
    } catch (error) {
      outputView.printErrorMessage(error);
      return this.readPurchaseAmount();
    }
  }

  async readWinningNumbers() {
    const winningNumbers = await this.#io.read('> 당첨 번호를 입력해 주세요. ');
    try {
      lottoGameValidator.checkWinningNumbers(winningNumbers);
      return winningNumbers.split(',').map(Number);
    } catch (error) {
      outputView.printErrorMessage(error);
      return this.readWinningNumbers();
    }
  }

  async readBonusNumber(winningNumbers) {
    const bonusNumber = await this.#io.read('> 보너스 번호를 입력해 주세요. ');
    try {
      lottoGameValidator.checkBonusNumber(bonusNumber, winningNumbers);
      return Number(bonusNumber);
    } catch (error) {
      outputView.printErrorMessage(error);
      return this.readBonusNumber(winningNumbers);
    }
  }
}

export default LottoGame;
