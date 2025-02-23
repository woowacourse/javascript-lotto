import formatResults from "../domain/formatResults.js";
import LottoGame from "../models/LottoGame.js";
import { generateLottos } from "../utils/generateLottos.js";
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

  const lottoGame = new LottoGame();
  const { rankCount, totalReward } = lottoGame.playLotto(lottos, {
    winningNumbers,
    bonusNumber,
  });

  printResult(formatResults(rankCount));
  printProfitRate(price, totalReward);
};

export default lottoController;
