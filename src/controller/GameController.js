import { getRetryInput, getBonusNumber, getPrice, getWinningNumber } from "../service/InputService.js";
import { calculateProfitRate } from "../service/ProfitService.js";
import { getLottoArray, getLottoCount } from "../service/PurchaseService.js";
import { calculateMatchingResult } from "../service/MatchingService.js";
import WinningLotto from "../domain/WinningLotto.js";
import retryOnError from "../util/retryOnError.js";
import OutputView from "../view/OutputView.js";
import SYSTEM_MESSAGE from "../constants/systemMessage.js";
import Lotto from "../domain/Lotto.js";

export const runLottoGame = async () => {
  while (true) {
    const price = await retryOnError(getPrice, OutputView.printError);
    const { lottoArray, lottoCount } = purchaseLottos(price);

    OutputView.print(SYSTEM_MESSAGE.COUNT(lottoCount));
    OutputView.printLottoArray(lottoArray);

    const winningNumbers = await retryOnError(getWinningNumber, OutputView.printError);
    const bonusNumber = await retryOnError(() => getBonusNumber(winningNumbers), OutputView.printError);

    const winningLotto = new WinningLotto(new Lotto(winningNumbers), bonusNumber);

    const matchingResult = calculateMatchingResult(winningLotto, lottoArray);
    const profitRate = calculateProfitRate(matchingResult, lottoCount);

    OutputView.printMatchingResult(matchingResult);
    OutputView.print(SYSTEM_MESSAGE.PROFIT(profitRate));

    const yesOrNo = await retryOnError(getRetryInput, OutputView.printError);
    if (yesOrNo === "n") {
      break;
    }
  }
};

const purchaseLottos = (price) => {
  const lottoCount = getLottoCount(price);
  const lottoArray = getLottoArray(lottoCount);
  return { lottoArray, lottoCount };
};

export default runLottoGame;
