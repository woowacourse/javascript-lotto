import WinningLotto from "../../common/domain/WinningLotto.js";
import { getBonusNumber, getWinningNumber } from "../service/InputService.js";
import { setState } from "../state/state.js";
import { alertError } from "../util/alertError.js";

export const WinningController = () => {
  const winningNumbers = alertError(getWinningNumber);
  const bonusNumber = alertError(() => getBonusNumber(winningNumbers));

  const winningLotto = new WinningLotto(winningNumbers, bonusNumber);
  setState({ winningLotto: winningLotto });
};
