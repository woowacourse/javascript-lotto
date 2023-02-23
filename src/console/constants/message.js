import { RANK, COMMAND } from '../../constants/setting';

const INPUT_MESSAGE = {
  PURCHASE_AMOUNT: '> 구입금액을 입력해 주세요.',
  WINNING_NUMBER: '> 당첨 번호를 입력해 주세요.',
  BONUS_NUMBER: '> 보너스 번호를 입력해 주세요.',
  RESTART_COMMAND: `> 다시 시작하시겠습니까? (${COMMAND.YES}/${COMMAND.NO})`,
};

const OUTPUT_MESSAGE = {
  WINNING_STATISTICS_HEADER: '당첨 통계\n' + '--------------------',
};

const OUTPUT_MESSAGE_METHOD = {
  PURCHASE_QUANTITY: (quantity) => `${quantity}개를 구매했습니다.`,
  RANK: (rank, count) =>
    `${RANK[rank].MATCH_COUNT}개 일치${rank === RANK.SECOND.NAME ? ', 보너스 볼 일치' : ''} (${RANK[
      rank
    ].REWARDS.toLocaleString()}원) - ${count}개`,
  PROFIT_RATE: (rate) =>
    `총 수익률은 ${rate.toLocaleString(undefined, { minimumFractionDigits: 1 })}%입니다.`,
};

export { INPUT_MESSAGE, OUTPUT_MESSAGE, OUTPUT_MESSAGE_METHOD };
