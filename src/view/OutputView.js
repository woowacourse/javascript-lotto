const OutputView = {
  printLottoTickets(tickets) {
    tickets.forEach((ticket) => {
      console.log(`[${ticket.join(', ')}]`);
    });
  },
};

export default OutputView;
