import { MESSAGE } from "../domain/message";
import {
  validateBonusNumber,
  validatePurchaseAmount,
  validateRestartOrQuitCommend,
  validateWinningLottoNumbers,
} from "../domain/validator";
import { getAscendingSortedNumbers } from "../utils";
import readlinePromises from "node:readline/promises";

const rl = readlinePromises.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const close = () => {
  rl.close();
};
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

  async readPurchaseAmount() {
    const purchaseAmount = await this.readline(MESSAGE.INPUT.lottoPurchaseAmount);
    if (!validatePurchaseAmount(purchaseAmount)) return this.readPurchaseAmount();
    return purchaseAmount;
  },

  async readWinningLottoNumbers() {
    const winningLottoNumbers = await this.readline(MESSAGE.INPUT.winningLottoNumbers);
    if (!validateWinningLottoNumbers(winningLottoNumbers)) return this.readWinningLottoNumbers();
    return winningLottoNumbers;
  },

  async readBonusNumber(winningLottoNumbers) {
    const bonusNumber = await this.readline(MESSAGE.INPUT.bonusNumber);
    if (!validateBonusNumber(bonusNumber, winningLottoNumbers))
      return this.readBonusNumber(winningLottoNumbers);
    return bonusNumber;
  },

  async readRestartOrQuit() {
    const restartOrQuitCommend = await this.readline(MESSAGE.INPUT.restartOrQuit);
    if (!validateRestartOrQuitCommend(restartOrQuitCommend)) return this.readRestartOrQuitCommend();
    return restartOrQuitCommend;
  },

  close() {
    rl.close();
  },
};
