import { InputView } from "../view/input.js";
import WinningLotto from "../domain/WinningLotto.js";
import { RESTART } from "../constants/constant.js";

export async function WinningLottoController() {
  const winningNumber = await InputView.inputWinningNumber();
  if (winningNumber === RESTART) return RESTART;
  const bonusNumber = await InputView.inputBonusNumber(winningNumber);
  const winningLotto = new WinningLotto(winningNumber, bonusNumber);
  return winningLotto;
}
