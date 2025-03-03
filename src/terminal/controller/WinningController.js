import { getBonusNumber, getWinningNumber } from "../service/InputService.js";
import OutputView from "../view/outputView.js";
import WinningLotto from "../../common/domain/WinningLotto.js";
import retryOnError from "../../common/util/retryOnError.js";

export const WinningController = async () => {
  const winningNumbers = await retryOnError(getWinningNumber, OutputView.printError);
  const bonusNumber = await retryOnError(() => getBonusNumber(winningNumbers), OutputView.printError);
  const winningLotto = new WinningLotto(winningNumbers, bonusNumber);
  return winningLotto;
};
