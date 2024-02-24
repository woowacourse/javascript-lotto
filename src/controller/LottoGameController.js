import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";
import getValidInput from "../utils/getValidInput.js";
import rankCounter from "../domain/rankCounter.js";
import getLottoPrizeMoney from "../domain/getLottoPrizeMoney.js";
import getRandomLottoArray from "../domain/getRandomLottoArray.js";
import { calculator } from "../domain/calculator.js";
import { LOTTO_SETTING } from "../constants/lottoConstants.js";

class LottoGameController {
  #budget;
  #winningLotto = {};

  /*
   * 로또 구매와 관련된 메소드들
   */
  async #initBudget() {
    const budget = await getValidInput(InputView.readBudget);
    this.#budget = Number(budget);
  }

  async #buyLotto() {
    await this.#initBudget();

    const lottoCount = calculator.getQuotient(this.#budget, LOTTO_SETTING.PRICE);
    return lottoCount;
  }

  /*
   * 로또 당첨 번호 설정과 관련된 메소드들
   */
  async #initWinningLotto() {
    const normalWinningNumbers = await getValidInput(InputView.readWinningLottoNumbers);
    this.#winningLotto.normalNumbers = normalWinningNumbers;
  }

  async #initWinningLottoBonus() {
    const bonusWinningNumber = await getValidInput(() =>
      InputView.readWinningLottoBonus(this.#winningLotto.normalNumbers),
    );
    this.#winningLotto.bonusNumber = bonusWinningNumber;
  }

  async #setWinningLotto() {
    await this.#initWinningLotto();
    await this.#initWinningLottoBonus();
  }

  #checkNormalNumbers = (lotto) => {
    return lotto.reduce((count, number) => count + this.#isMatchedNumber(number), 0);
  };

  #checkBonusNumber = (lotto, normalCount) => {
    return normalCount === 5 && lotto.includes(this.#winningLotto.bonusNumber) ? 1 : 0;
  };

  /*
   * 로또 게임 결과 산출과 관련된 함수들
   */
  #countMatchingNumbers = (lotto) => {
    const lottoCounts = {
      normal: 0,
      bonus: false,
    };
    lottoCounts.normal = this.#checkNormalNumbers(lotto);
    lottoCounts.bonus = this.#checkBonusNumber(lotto, lottoCounts.normal);

    return lottoCounts;
  };

  #getMatchingResult = (randomLottos) => {
    const matchingResult = randomLottos.map(this.#countMatchingNumbers);
    return matchingResult;
  };

  #isMatchedNumber = (number) => {
    return this.#winningLotto.normalNumbers.includes(number) ? 1 : 0;
  };

  #inspectLottoGameResult(randomLottos) {
    const matchingResult = this.#getMatchingResult(randomLottos);
    const rankData = rankCounter.countRanks(matchingResult);

    return rankData;
  }

  /*
   * 게임 실행 로직과 관련된 함수들
   */
  async #runLottoGame() {
    const lottoCount = await this.#buyLotto();
    OutputView.printLottoCount(lottoCount);

    const randomLottos = getRandomLottoArray(lottoCount);
    OutputView.printIssuedLottoArray(randomLottos);

    await this.#setWinningLotto();

    return this.#inspectLottoGameResult(randomLottos);
  }

  async #displayGameResult(rankData) {
    OutputView.printMatchedLottos(rankData);

    const prizeMoney = getLottoPrizeMoney(rankData);
    OutputView.printProfits(calculator.getProfits(prizeMoney, this.#budget));
  }

  async playGame() {
    const rankData = await this.#runLottoGame();

    await this.#displayGameResult(rankData);

    this.#retryGame();
  }

  #checkRetryGame(retryInput) {
    if (retryInput === "y") return this.playGame();
  }

  async #retryGame() {
    const retryInput = await getValidInput(InputView.readRetryGame);
    this.#checkRetryGame(retryInput);
  }
}

export default LottoGameController;
