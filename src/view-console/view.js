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
    try {
      const purchaseAmount = await this.readline(MESSAGE.INPUT.lottoPurchaseAmount);
      validatePurchaseAmount(purchaseAmount);
      return purchaseAmount;
    } catch (error) {
      this.print(error.message);
      return this.readPurchaseAmount();
    }
  },

  async readWinningLottoNumbers() {
    try {
      const winningLottoNumbers = await this.readline(MESSAGE.INPUT.winningLottoNumbers);
      validateWinningLottoNumbers(winningLottoNumbers.split(",").map(Number));
      return winningLottoNumbers;
    } catch (error) {
      this.print(error.message);
      return this.readWinningLottoNumbers();
    }
  },

  async readBonusNumber(winningLottoNumbers) {
    try {
      const bonusNumber = await this.readline(MESSAGE.INPUT.bonusNumber);
      validateBonusNumber(bonusNumber, winningLottoNumbers);
      return bonusNumber;
    } catch (error) {
      this.print(error.message);
      return this.readBonusNumber(winningLottoNumbers);
    }
  },

  async readRestartOrQuit() {
    try {
      const restartOrQuitCommend = await this.readline(MESSAGE.INPUT.restartOrQuit);
      validateRestartOrQuitCommend(restartOrQuitCommend);
      return restartOrQuitCommend;
    } catch (error) {
      this.print(error.message);
      return this.readRestartOrQuit();
    }
  },

  close() {
    rl.close();
  },
};
