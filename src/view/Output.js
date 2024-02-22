import Condition from '../constants/Condition';
import Message from '../constants/Message';

const { PRIZE } = Condition;
const { OUTPUT } = Message;

const Output = {
  printLottoTicketsPurchaseResult(lottoTickets) {
    console.log(OUTPUT.LOTTO_TICKETS_COUNT(lottoTickets.length));

    lottoTickets.forEach((lottoTicket) => {
      console.log(lottoTicket.getNumbers().sort((a, b) => a - b));
    });
  },

  printPrizeDetails(prizes) {
    PRIZE.forEach(([rank, detail]) =>
      console.log(OUTPUT.PRIZE_DETAIL(detail, prizes.filter((prize) => prize === rank).length)),
    );
  },

  printReturnOnInvestment(returnOnInvestment) {
    console.log(OUTPUT.RETURN_ON_INVESTMENT(returnOnInvestment));
  },
};

export default Output;
