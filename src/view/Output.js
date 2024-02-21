const PRIZE_REWARD = {
  1: {
    MATCH: 6,
    REWARD: 2000000000,
  },
  2: {
    MATCH: 5,
    REWARD: 30000000,
  },
  3: {
    MATCH: 5,
    REWARD: 1500000,
  },
  4: {
    MATCH: 4,
    REWARD: 50000,
  },
  5: {
    MATCH: 3,
    REWARD: 5000,
  },
};

const Output = {
  printLottoTicketsPurchaseResult(lottoTickets) {
    console.log(`${lottoTickets.length}개를 구매했습니다.`);

    lottoTickets.forEach((lottoTicket) => {
      console.log(lottoTicket.getNumbers().sort((a, b) => a - b));
    });
  },

  printPrizeDetails(prizes) {
    Object.entries(PRIZE_REWARD)
      .reverse()
      .forEach(([rank, detail]) =>
        console.log(
          `${detail.MATCH}개 일치 (${detail.REWARD}원) - ${
            prizes.filter((prize) => prize === Number(rank)).length
          }개`,
        ),
      );
  },

  printReturnOnInvestment(returnOnInvestment) {
    console.log(`총 수익률은 ${returnOnInvestment}%입니다.`);
  },
};

export default Output;
