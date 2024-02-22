import Condition from '../constants/Condition';

const { PRIZE } = Condition;

const Output = {
  printLottoTicketsPurchaseResult(lottoTickets) {
    console.log(`${lottoTickets.length}개를 구매했습니다.`);

    lottoTickets.forEach((lottoTicket) => {
      console.log(lottoTicket.getNumbers().sort((a, b) => a - b));
    });
  },

  printPrizeDetails(prizes) {
    Object.entries(PRIZE)
      .reverse()
      .forEach(([rank, detail]) =>
        console.log(
          `${detail.MATCH}개 일치 (${detail.REWARD}원) - ${
            prizes.filter((prize) => prize === rank).length
          }개`,
        ),
      );
  },

  printReturnOnInvestment(returnOnInvestment) {
    console.log(`총 수익률은 ${returnOnInvestment}%입니다.`);
  },
};

export default Output;
