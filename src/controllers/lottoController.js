import checkWinningResults from "../domain/checkWinningResults.js";
import { generateLottos } from "../domain/generateLottos.js";
import { getBonusNumber, getWinningNumbers } from "../view/input.js";
import {
  printLottoCount,
  printLottoNumbers,
  printProfitRate,
  printResult,
} from "../view/output.js";

const lottoController = async (price) => {
  const lottos = generateLottos(price);
  printLottoCount(lottos.length);
  lottos.forEach((lotto) => printLottoNumbers(lotto.numbers));

  const winningNumbers = await getWinningNumbers();
  const bonusNumber = await getBonusNumber(winningNumbers);

  const { resultCount, totalReward } = checkWinningResults(lottos, {
    winningNumbers,
    bonusNumber,
  });

  printResult(resultCount);
  printProfitRate(price, totalReward);
};

export default lottoController;
