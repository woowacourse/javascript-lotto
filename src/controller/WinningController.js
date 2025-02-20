import WinningLotto from "../domain/WinningLotto.js";
import { getBonusNumber, getWinningNumber } from "../service/InputService.js";
import retryOnError from "../util/retryOnError.js";
import OutputView from "../view/OutputView.js";

export const WinningController = async () => {
  const winningNumbers = await retryOnError(getWinningNumber, OutputView.printError);
  const bonusNumber = await retryOnError(() => getBonusNumber(winningNumbers), OutputView.printError);
  const winningLotto = new WinningLotto(winningNumbers, bonusNumber);
  return winningLotto;
};
