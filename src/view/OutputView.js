const OutputView = {
  printPurchaseCount(purchaseCount) {
    console.log(`${purchaseCount}개를 구매했습니다.`);
  },

  printLottoTickets(tickets) {
    tickets.forEach((ticket) => {
      console.log(`[${ticket.join(', ')}]`);
    });
  },
};

export default OutputView;
