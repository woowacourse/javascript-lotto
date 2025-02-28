import LottoMachine from "../../domain/LottoMachine/LottoMachine.js";
import OutputView from "../../view/OutputView.js";
import profitCalculator from "../../domain/profitCalculator/profitCalculator.js";
import generateAnswerLotto from "../../domain/generateAnswerLotto.js";
import InputHandler from "./InputHandler.js";

const startLottoGame = async () => {
  const purchaseAmount = await InputHandler.purchaseAmount();
  const lottoPack = LottoMachine(purchaseAmount);
  OutputView.purchaseCount(lottoPack.count);
  OutputView.lottoPack(lottoPack.lottos);

  const { winningNumbers, bonusNumber } = await InputHandler.answerLotto();
  const answerLotto = generateAnswerLotto(winningNumbers, bonusNumber);

  const winningResult = lottoPack.compareAndReturnResult(answerLotto);
  OutputView.winningStatistics(winningResult);

  const profitRate = profitCalculator(purchaseAmount, winningResult);
  OutputView.profitRate(profitRate);

  await InputHandler.reStart(startLottoGame);
};

export default startLottoGame;
