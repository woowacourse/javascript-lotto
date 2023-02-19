import { MESSAGE } from "../domain/message";
import { rl } from "../utils";

export const inputView = {
  readline(message) {
    return rl.question(message);
  },

  readLottoPurchaseAmount() {
    return this.readline(MESSAGE.INPUT.lottoPurchaseAmount);
  },

  readWinningLottoNumbers() {
    return this.readline(MESSAGE.INPUT.winningLottoNumbers);
  },

  readBonusNumber() {
    return this.readline(MESSAGE.INPUT.bonusNumber);
  },

  readRestartOrQuit() {
    return this.readline(MESSAGE.INPUT.restartOrQuit);
  },
};
