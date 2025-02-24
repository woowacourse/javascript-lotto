import calcProfitRate from "../domain/calcProfitRate.js";
import formatResults from "../domain/formatResults.js";
import LottoGame from "../models/LottoGame.js";
import {
  getBonusNumber,
  getLottoPrice,
  getRestart,
  getWinningNumbers,
} from "../view/input.js";
import {
  printLottoCount,
  printLottoNumbers,
  printProfitRate,
  printResult,
} from "../view/output.js";

const lottoController = async () => {
  const price = await getLottoPrice();

  const lottoGame = new LottoGame();
  const lottos = lottoGame.generateLottos(price);

  printLottoCount(lottos.length);
  lottos.forEach((lotto) => printLottoNumbers(lotto.numbers));

  const winningNumbers = await getWinningNumbers();
  const bonusNumber = await getBonusNumber(winningNumbers);

  const gameResults = lottoGame.playLotto(lottos, {
    winningNumbers,
    bonusNumber,
  });
  const totalReward = lottoGame.calcTotalReward(gameResults);
  const rankCount = lottoGame.getRankCount(gameResults);

  printResult(formatResults(rankCount).reverse());
  printProfitRate(calcProfitRate(price, totalReward));

  if (await getRestart()) lottoController();
};

export default lottoController;
