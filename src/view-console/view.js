import { MESSAGE } from "../domain/message";
import { getAscendingSortedNumbers, rl } from "../utils";

export const view = {
  // OutputView
  print(message) {
    console.log(message);
  },

  printNumberOfPurchasedLottos(numberOfPurchasedLottos) {
    this.print(MESSAGE.OUTPUT.numberOfPurchasedMessage(numberOfPurchasedLottos));
  },

  printLottos(lottos) {
    lottos.forEach((lotto) => this.print(getAscendingSortedNumbers(lotto.numbers)));
  },

  printPlacesOfLottos(placesOfLottos) {
    this.print(MESSAGE.OUTPUT.statistics(placesOfLottos));
  },

  printRateOfReturn(rateOfReturn) {
    rateOfReturn = rateOfReturn.toLocaleString();

    this.print(MESSAGE.OUTPUT.rateOfReturnMessage(rateOfReturn));
  },

  // inputView
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
