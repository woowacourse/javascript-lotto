import { getAscendingSortedNumbers } from "../step1-index";

export const outputView = {
  print(message) {
    console.log(message);
  },

  printNumberOfPurchasedLottoTickets(numberOfPurchasedLottoTickets) {
    this.print(`${numberOfPurchasedLottoTickets}개를 구매했습니다.`);
  },

  printLottoTickets(lottoTickets) {
    lottoTickets.map((ticket) => this.print(getAscendingSortedNumbers(ticket)));
  },
};
