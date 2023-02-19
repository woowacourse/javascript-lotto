import { MESSAGE } from "../domain/message";
import { getAscendingSortedNumbers } from "../utils";

export const outputView = {
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
};
