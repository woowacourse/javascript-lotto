import Message from '../constants/Message';

const { OUTPUT } = Message;

const Output = {
  printLottoTicketsCount(lottoTickets) {
    console.log(`${lottoTickets.length} ${OUTPUT.LOTTO_TICKETS_COUNT}`);
  },

  printLottoTicketsDetail(lottoTickets) {
    lottoTickets.forEach((lottoTicket) => {
      console.log(lottoTicket.getSortedNumbersAscending());
    });

    console.log(OUTPUT.NEW_LINE);
  },

  printPrizeStatisticsHeader() {
    console.log(OUTPUT.NEW_LINE);
    console.log(OUTPUT.PRIZE_STATISTICS_HEADER);
    console.log(OUTPUT.PRIZE_STATISTICS_SEPARATOR);
  },

  printPrizeDetails(prizeDetailMessages) {
    prizeDetailMessages.forEach((message) => console.log(message));
  },

  printReturnOnInvestment(returnOnInvestment) {
    console.log(
      `${OUTPUT.RETURN_ON_INVESTMENT_HEADER} ${returnOnInvestment} ${OUTPUT.RETURN_ON_INVESTMENT_FOOTER}`,
    );
    console.log(OUTPUT.NEW_LINE);
  },
};

export default Output;
