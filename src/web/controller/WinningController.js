import WinningLotto from "../../common/domain/WinningLotto.js";
import { getBonusNumber, getWinningNumber } from "../service/InputService.js";
import { setState } from "../state/state.js";
import { alertError } from "../util/alertError.js";

export const WinningController = () => {
  console.log("작동");
  const winningNumbers = alertError(getWinningNumber);
  const bonusNumber = alertError(() => getBonusNumber(winningNumbers));

  const winningLotto = new WinningLotto(winningNumbers, bonusNumber);
  setState({ winningLotto: winningLotto });
};
