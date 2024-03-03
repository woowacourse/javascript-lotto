import { OUTPUT_INFO } from '../../constant/messages';

const OutputView = {
  printPurchaseCount(purchaseCount) {
    console.log(OUTPUT_INFO.displayPurchaseCount(purchaseCount));
  },

  printLottoTickets(tickets) {
    tickets.forEach((ticket) => {
      const convertedTicket = ticket.join(', ');
      console.log(OUTPUT_INFO.formatTicket(convertedTicket));
    });
  },

  printWinningStats(winningStats) {
    console.log(OUTPUT_INFO.WINNING_STATS);
    console.log(OUTPUT_INFO.WINNING_STATS_DIVIDIMG_LINE);
    Object.entries(winningStats).forEach(([key, value]) => {
      const [prize, count] = [key, value];
      console.log(OUTPUT_INFO.describeWinning(prize, count));
    });
  },

  printRateOfReturn(rateOfReturn) {
    console.log(OUTPUT_INFO.displayRateOfReturn(rateOfReturn));
  },
};

export default OutputView;
