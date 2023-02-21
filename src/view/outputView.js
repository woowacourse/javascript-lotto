import { getAscendingSortedNumbers } from "../util";

export const outputView = {
  print(message) {
    console.log(message);
  },

  printPurchasedLottoTicketCount(purchaseCount) {
    this.print(`${purchaseCount}개를 구매했습니다.`);
  },

  printLottoTickets(lottoTickets) {
    lottoTickets.forEach((ticket) => this.print(getAscendingSortedNumbers(ticket)));
  },

  printWinningLottoCount(placesOfLottoTickets) {
    this.print(`\n당첨 통계

3개 일치 (5,000원) - ${placesOfLottoTickets.filter((num) => num === 5).length}개
4개 일치 (50,000원) - ${placesOfLottoTickets.filter((num) => num === 4).length}개
5개 일치 (1,500,000원) - ${placesOfLottoTickets.filter((num) => num === 3).length}개
5개 일치, 보너스 볼 일치 (30,000,000원) - ${
      placesOfLottoTickets.filter((num) => num === 2).length
    }개
6개 일치 (2,000,000,000원) - ${placesOfLottoTickets.filter((num) => num === 1).length}개`);
  },

  printRateOfReturn(rateOfReturn) {
    this.print(`총 수익률은 ${rateOfReturn.toLocaleString()}% 입니다.\n`);
  },
};
