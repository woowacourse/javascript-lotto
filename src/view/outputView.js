import { getAscendingSortedNumbers } from "../util/sort";

export const outputView = {
  print(message) {
    console.log(message);
  },

  printNumberOfPurchasedLottoTickets(numberOfPurchasedLottoTickets) {
    this.print(`${numberOfPurchasedLottoTickets}개를 구매했습니다.`);
  },

  printLottoTickets(lottoTickets) {
    lottoTickets.forEach((ticket) => this.print(getAscendingSortedNumbers(ticket)));
  },
};
