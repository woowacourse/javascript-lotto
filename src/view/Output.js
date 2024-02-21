const Output = {
  printLottoTicketsCount(lottoTickets) {
    console.log(`${lottoTickets.length}개를 구매했습니다.`);
  },

  printAscendingOrderLottoTickets(lottoTickets) {
    lottoTickets.forEach((lottoTicket) => {
      console.log(lottoTicket.getNumbers().sort((a, b) => a - b));
    });
  },
};

export default Output;
