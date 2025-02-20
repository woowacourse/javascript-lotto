import checkRank from "../domain/checkRank.js";
import { generateLottos } from "../domain/generateLottos.js";
import updateMatchResult from "../domain/updateMatchResult.js";
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

  lottos.forEach((lotto) => {
    updateMatchResult(lotto, winningNumbers, bonusNumber);
  });

  let totalReward = 0;
  let resultCount = new Array(6).fill(0);

  lottos.forEach((lotto) => {
    const result = checkRank(
      lotto.matchResult.matchCount,
      lotto.matchResult.isBonusMatched
    );
    if (result) {
      totalReward += result.REWARD;
      resultCount[result.RANK]++;
    }
  });

  printResult(resultCount);
  printProfitRate(price, totalReward);
};

export default lottoController;
