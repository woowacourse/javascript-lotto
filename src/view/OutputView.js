import Console from '../util/Console';

const labels = [
  '3개 일치 (5,000원) - ',
  '4개 일치 (50,000원) - ',
  '5개 일치 (1,500,000원) - ',
  '5개 일치, 보너스 볼 일치 (30,000,000원) - ',
  '6개 일치 (2,000,000,000원) - ',
];

const OutputView = {
  printLottoTicketCount(ticketCount) {
    Console.print(`${ticketCount}개를 구매했습니다.`);
  },

  printLottoTickets(lottoTickets) {
    lottoTickets.forEach((ticket) => {
      Console.print(`[${ticket.join(', ')}]`);
    });
  },

  printResultTitle() {
    Console.print('\n당첨 통계');
    Console.print(`${'-'.repeat(20)}`);
  },

  printLottoRanksResult(lottoRanksCount) {
    lottoRanksCount
      .slice(1, lottoRanksCount.length)
      .reverse()
      .forEach((lottoRankCount, index) => {
        Console.print(`${labels[index]}${lottoRankCount}개`);
      });
  },

  printProfitRate(profitRate) {
    Console.print(`총 수익률은 ${profitRate}% 입니다.\n`);
  },
};

export default OutputView;
