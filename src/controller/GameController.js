import { getRetryInput, getBonusNumber, getPrice, getWinningNumber } from "../service/InputService.js";
import { calculateProfitRate } from "../service/ProfitService.js";
import { purchaseLottos } from "../service/PurchaseService.js";
import { calculateMatchingResult } from "../service/MatchingService.js";
import WinningLotto from "../domain/WinningLotto.js";
import retryOnError from "../util/retryOnError.js";
import OutputView from "../view/OutputView.js";
import SYSTEM_MESSAGE from "../constants/systemMessage.js";
import Lotto from "../domain/Lotto.js";

export const runLottoGame = async () => {
  while (true) {
    const { lottoArray } = await requestLottoPurchase();
    const winningLotto = await generateWinningLotto();
    processLottoResults(winningLotto, lottoArray);
    if (!(await askUserToRetry())) break;
  }
};

const requestLottoPurchase = async () => {
  const price = await retryOnError(getPrice, OutputView.printError);
  const { lottoArray, lottoCount } = purchaseLottos(price);

  OutputView.print(SYSTEM_MESSAGE.COUNT(lottoCount));
  OutputView.printLottoArray(lottoArray);

  return { lottoArray };
};

const generateWinningLotto = async () => {
  const winningNumbers = await retryOnError(getWinningNumber, OutputView.printError);
  const bonusNumber = await retryOnError(() => getBonusNumber(winningNumbers), OutputView.printError);

  return new WinningLotto(new Lotto(winningNumbers), bonusNumber);
};

const processLottoResults = (winningLotto, lottoArray) => {
  const matchingResult = calculateMatchingResult(winningLotto, lottoArray);
  const profitRate = calculateProfitRate(matchingResult, lottoArray.length);

  OutputView.printMatchingResult(matchingResult);
  OutputView.print(SYSTEM_MESSAGE.PROFIT(profitRate));
};

const askUserToRetry = async () => {
  const yesOrNo = await retryOnError(getRetryInput, OutputView.printError);
  return yesOrNo === "y";
};
