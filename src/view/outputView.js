import { MESSAGE } from "../domain/message";
import { getAscendingSortedNumbers } from "../util/sort";

export const outputView = {
  print(message) {
    console.log(message);
  },

  printNumberOfPurchasedLottoTickets(numberOfPurchasedLottoTickets) {
    this.print(MESSAGE.OUTPUT.numberOfPurchasedMessage(numberOfPurchasedLottoTickets));
  },

  printLottoTickets(lottoTickets) {
    lottoTickets.forEach((ticket) => this.print(getAscendingSortedNumbers(ticket)));
  },

  printPlacesOfLottoTickets(placesOfLottoTickets) {
    this.print(MESSAGE.OUTPUT.statistics(placesOfLottoTickets));
  },

  printRateOfReturn(rateOfReturn) {
    rateOfReturn = rateOfReturn.toLocaleString();

    this.print(MESSAGE.OUTPUT.rateOfReturnMessage(rateOfReturn));
  },
};
