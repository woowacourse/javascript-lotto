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

  printPlacesOfLottoTickets(placesOfLottoTickets) {
    this.print(`\n당첨 통계
--------------------
3개 일치 (5,000원) - ${placesOfLottoTickets.FIFTH_PLACE}개
4개 일치 (50,000원) - ${placesOfLottoTickets.FOURTH_PLACE}개
5개 일치 (1,500,000원) - ${placesOfLottoTickets.THIRD_PLACE}개
5개 일치, 보너스 볼 일치 (30,000,000원) - ${placesOfLottoTickets.SECOND_PLACE}개
6개 일치 (2,000,000,000원) - ${placesOfLottoTickets.FIRST_PLACE}개`);
  },

  printRateOfReturn(rateOfReturn) {
    rateOfReturn = rateOfReturn.toLocaleString();

    this.print(`총 수익률은 ${rateOfReturn}% 입니다.\n`);
  },
};
