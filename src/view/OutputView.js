import { MESSAGE, RESULT } from '../constants/message';

const OutputView = {
  printPurchaseCount(purchaseCount) {
    console.log(`${purchaseCount}${MESSAGE.NUMBER_OF_TICKETS_PURCHASED}`);
  },

  printLottoTickets(lottoTickets) {
    lottoTickets.forEach((lottoTicket) => {
      console.log(`[${lottoTicket.tickets.join(', ')}]`);
    });
  },

  printWinningStats(matchingResult) {
    console.log(`${MESSAGE.WINNING_STATS}\n${MESSAGE.SEPARATOR}`);
    Object.keys(matchingResult)
      .reverse()
      .map((rank) => {
        console.log(`${RESULT[rank]}${matchingResult[rank]}개`);
      });
  },

  printRateOfReturn(rateOfReturn) {
    console.log(`${MESSAGE.PROFIT.replace('_', rateOfReturn)}`);
  },
};

export default OutputView;
