import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";
import getValidInput from "../utils/getValidInput.js";
import randomLottoArray from "../domain/randomLottoMaker.js";
import lottoStatistics from "../domain/lottoStatistics.js";
import Lotto from "../domain/Lotto.js";

/**
 * @returns {Number}
 */
async function handleBudget() {
  const budget = await getValidInput(() => InputView.readBudget());
  return budget;
}

const LottoController = {
  async start() {
    // budget 저장해줘
    const budget = await handleBudget();
    // 로또 장 수 계산하고 출력해줘
    const lotto = new Lotto(budget);
    const issuedLottoCount = lotto.calculateIssuedLottoCount();
    OutputView.printLottoCount(issuedLottoCount);
    //
  },
};

class LottoGameController {
  #budget;
  #winningLotto = {};

  async #initBudget() {
    const budget = await getValidInput(InputView.readBudget);
    this.#budget = Number(budget);
  }

  async #initWinningLotto() {
    const winningLotto = await getValidInput(InputView.readWinningLottoNumbers);
    this.#winningLotto["normalNumbers"] = winningLotto;
  }

  async #initWinningLottoBonus() {
    const winningLottoBonus = await getValidInput(() =>
      InputView.readWinningLottoBonus(this.#winningLotto["normalNumbers"])
    );
    this.#winningLotto["bonusNumber"] = winningLottoBonus;
  }

  #calculateLottoCount() {
    return this.#budget / 1000;
  }

  #printLottoCount() {
    OutputView.printLottoCount(this.#calculateLottoCount());
  }

  async play() {
    // 구입 금액을 입력받고 그에 따른 로또 발행 개수 출력
    await this.#initBudget();
    this.#printLottoCount();

    // 로또 발행 개수만큼 로또를 발행한 뒤 출력
    const randomLottos = randomLottoArray(this.#calculateLottoCount());
    this.#printIssuedLottos(randomLottos);

    //로또 당첨 번호와 보너스 번호 읽어오기
    await this.#initWinningLotto();
    await this.#initWinningLottoBonus();

    // 발행된 로또 중 당첨된 로또를 조사
    const matchingResult = this.#lottoMatcher(randomLottos);

    const matchedLotto = this.countRanks(matchingResult);
    console.log(matchedLotto);

    // 발행된 로또와 입력된 로또 번호를 비교하여 당첨 통계 계산
    const resultStatistics = lottoStatistics(matchedLotto);
    this.#printResultStatistics(this.#calculateProfits(resultStatistics));
    this.#retryGame();
  }

  #printIssuedLottos(randomLottos) {
    OutputView.printIssuedLottoArray(randomLottos);
  }

  /**
   * @param {Array} 매칭된 로또 번호와 보너스 번호의 개수가 있는 객체
   * @return {Object} 등수 별 당첨 횟수
   */
  countRanks(results) {
    return results.reduce(
      (ranks, result) => {
        const normalCount = result.normal;
        const bonusCount = result.bonus;
        if (normalCount === 6) {
          ranks[1] += 1;
        }
        if (normalCount === 5 && bonusCount === 1) {
          ranks[2] += 1;
        }
        if (normalCount === 5) {
          ranks[3] += 1;
        }
        if (normalCount === 4) {
          ranks[4] += 1;
        }
        if (normalCount === 3) {
          ranks[5] += 1;
        }
        return ranks;
      },
      { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    );
  }

  /**
   * @param {Array} 발행된 랜덤 로또 번호
   * @return {Array}
   */
  #lottoMatcher(randomLottos) {
    const lottoCountsArray = randomLottos.map((lotto) => {
      /**
       * normal: 당첨 번호와 매치되는 로또 번호 개수
       * bonus: 보너스 넘버와 일치하는지 여부
       */
      const lottoCounts = {
        normal: 0,
        bonus: 0,
      };

      lotto.forEach((number) => {
        if (this.#winningLotto["normalNumbers"].includes(number)) {
          lottoCounts.normal += 1;
        }
        if (this.#winningLotto["bonusNumber"] === number) {
          lottoCounts.bonus += 1;
        }
      });
      return lottoCounts;
    });
    return lottoCountsArray;
  }

  #printMatchedLotto(matchedLotto) {
    OutputView.printMatchedLottos(matchedLotto);
  }

  #printResultStatistics(resultStatistics) {
    OutputView.printResultStatistics(resultStatistics);
  }

  #calculateProfits(resultStatistics) {
    return (resultStatistics / this.#budget) * 100;
  }

  async #retryGame() {
    const retryInput = await getValidInput(InputView.readRetryGame);
    this.#checkRetryGame(retryInput);
  }

  /**
   * @param {string} 재시도 여부
   */
  #checkRetryGame(retryInput) {
    if (retryInput === "y") return this.play();
  }
}

// export default LottoGameController;
export default LottoController;
