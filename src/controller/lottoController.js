import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";
import getValidInput from "../utils/getValidInput.js";
import Lotto from "../domain/Lotto.js";
import lottoResultMaker from "../domain/lottoResultMaker.js";
import lottoRankMaker from "../domain/lottoRankMaker.js";
import profitCalculator from "../domain/profitCalculator.js";

/**
 * @returns {Number}
 */
async function handleBudget() {
  const budget = await getValidInput(() => InputView.readBudget());
  return budget;
}

/**
 * @returns {Array}
 */
async function handleWinningNumbers() {
  const winningNumbers = await getValidInput(() => InputView.readWinningLottoNumbers());
  return winningNumbers;
}

/**
 * @param {Array} winningNumbers
 * @returns {Object}
 */
async function handleWinningCombination(winningNumbers) {
  const winningCombination = await getValidInput(() => InputView.readWinningLottoBonus(winningNumbers));
  return winningCombination;
}

/**
 * @returns {Boolean}
 */
async function retryGame() {
  const retryInput = await getValidInput(() => InputView.readRetryGame());
  return retryInput === "y";
}

const lottoController = {
  async start() {
    const budget = await handleBudget();

    const lotto = new Lotto(budget);
    const issuedLottoCount = lotto.calculateIssuedLottoCount();
    OutputView.printLottoCount(issuedLottoCount);

    const issuedLottoArray = lotto.IssuedLotto(issuedLottoCount);
    OutputView.printIssuedLottoArray(issuedLottoArray);

    const winningNumbers = await handleWinningNumbers();
    OutputView.printSpace();
    const winningCombination = await handleWinningCombination(winningNumbers);
    OutputView.printSpace();

    const lottoResult = lottoResultMaker.calculateLottoResult(issuedLottoArray, winningCombination);

    const lottoRankResult = lottoRankMaker.calculateLottoRank(lottoResult);
    OutputView.printMatchedLottos(lottoRankResult);

    const profit = profitCalculator.calculateProfit(lottoRankResult, budget);
    OutputView.printResultStatistics(profit);

    if (await retryGame()) return lottoController.start();
    return;
  },
};

export default lottoController;
