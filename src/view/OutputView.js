import { LOTTO_RANK } from '../constants';
import Console from '../util/Console';

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

  printLottoRanksResult(lottoRanksResult) {
    Object.entries(lottoRanksResult).forEach(([rank, rankCount]) => {
      const rankName = rank.toUpperCase();

      Console.print(
        `${LOTTO_RANK[rankName].MATCHED_NUMBER_COUNT}개 일치${
          rankName === 'SECOND' ? ', 보너스 볼 일치' : ''
        } (${LOTTO_RANK[rankName].PRIZE.toLocaleString('ko-KR')}원) - ${rankCount}개`
      );
    });
  },

  printProfitRate(profitRate) {
    Console.print(`총 수익률은 ${profitRate}% 입니다.\n`);
  },
};

export default OutputView;
