import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";
import getValidInput from "../utils/getValidInput.js";
import Lotto from "../domain/Lotto.js";
import LottoResultMaker from "../domain/LottoResultMaker.js";
import LottoRankMaker from "../domain/lottoRankMaker.js";
import ProfitCalculator from "../domain/ProfitCalculator.js";

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
 *
 * @returns {Boolean}
 */
async function retryGame() {
  const retryInput = await getValidInput(() => InputView.readRetryGame());
  return retryInput === "y";
}

const LottoController = {
  async start() {
    // budget 저장해줘
    const budget = await handleBudget();

    // 로또 장 수 계산하고 출력해줘
    const lotto = new Lotto(budget);
    const issuedLottoCount = lotto.calculateIssuedLottoCount();
    OutputView.printLottoCount(issuedLottoCount);

    // 로또 배열 만들고 출력해줘
    const issuedLottoArray = lotto.IssuedLotto(issuedLottoCount);
    OutputView.printIssuedLottoArray(issuedLottoArray);

    // 당첨 번호와 로또 번호 저장해줘
    const winningNumbers = await handleWinningNumbers();
    OutputView.printSpace();
    const winningCombination = await handleWinningCombination(winningNumbers);
    OutputView.printSpace();

    // 각 로또별 당첨 번호, 보너스 번호와 몇 개 일치한지 확인해줘
    const lottoResult = LottoResultMaker.calculateLottoResult(issuedLottoArray, winningCombination);

    //일치하는 개수에 따라 등수별 로또가 몇 장 있는지 계산하고 출력해줘
    const lottoRankResult = LottoRankMaker.calculateLottoRank(lottoResult);
    OutputView.printMatchedLottos(lottoRankResult);

    // 수익률 계산하고 출력해줘
    const profit = ProfitCalculator.calculateProfit(lottoRankResult, budget);
    OutputView.printResultStatistics(profit);

    // 재시작!
    if (await retryGame()) return LottoController.start();
    return;
  },
};

export default LottoController;
