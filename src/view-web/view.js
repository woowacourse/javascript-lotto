import { MESSAGE } from "../domain/message";
import {
  validateBonusNumber,
  validatePurchaseAmount,
  validateRestartOrQuitCommend,
  validateWinningLottoNumbers,
} from "../domain/validator";
import { getAscendingSortedNumbers } from "../utils";

const $purchaseAmountMessageSpan = document.querySelector(".message-purchaseAmount");
const $lottos = document.querySelector(".lottos");

export const view = {
  // rendering
  printNumberOfPurchasedLottos(numberOfPurchasedLottos) {
    $purchaseAmountMessageSpan.textContent =
      MESSAGE.OUTPUT.numberOfPurchasedMessage(numberOfPurchasedLottos);
  },

  printLottos(lottos) {
    $lottos.innerHTML = "";
    const lottoTags = lottos
      .map(
        (lotto) =>
          `<div class="lotto">
      <span class="emoji-lotto">🎟️</span
      ><span class="lottoNumber">${getAscendingSortedNumbers(lotto.numbers).join(", ")}</span>
    </div>`
      )
      .join("");
    $lottos.innerHTML = lottoTags;
  },

  // printPlacesOfLottos(placesOfLottos) {
  //   this.print(MESSAGE.OUTPUT.statistics(placesOfLottos));
  // },

  // printRateOfReturn(rateOfReturn) {
  //   rateOfReturn = rateOfReturn.toLocaleString();

  //   this.print(MESSAGE.OUTPUT.rateOfReturnMessage(rateOfReturn));
  // },

  // // inputView
  // async readPurchaseAmount() {
  //   const purchaseAmount = await this.readline(MESSAGE.INPUT.lottoPurchaseAmount);
  //   if (!validatePurchaseAmount(purchaseAmount)) return this.readPurchaseAmount();
  //   return purchaseAmount;
  // },

  // async readWinningLottoNumbers() {
  //   const winningLottoNumbers = await this.readline(MESSAGE.INPUT.winningLottoNumbers);
  //   if (!validateWinningLottoNumbers(winningLottoNumbers)) return this.readWinningLottoNumbers();
  //   return winningLottoNumbers;
  // },

  // async readBonusNumber(winningLottoNumbers) {
  //   const bonusNumber = await this.readline(MESSAGE.INPUT.bonusNumber);
  //   if (!validateBonusNumber(bonusNumber, winningLottoNumbers))
  //     return this.readBonusNumber(winningLottoNumbers);
  //   return bonusNumber;
  // },

  // async readRestartOrQuit() {
  //   const restartOrQuitCommend = await this.readline(MESSAGE.INPUT.restartOrQuit);
  //   if (!validateRestartOrQuitCommend(restartOrQuitCommend)) return this.readRestartOrQuitCommend();
  //   return restartOrQuitCommend;
  // },
};
