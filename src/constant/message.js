const { RANK } = require('./setting');

const INPUT_MESSAGE = {
  PURCHASE_AMOUNT: '> 구입금액을 입력해 주세요.',
  WINNUNG_NUMBER: '> 당첨 번호를 입력해 주세요.',
  BONUS_NUMBER: '> 보너스 번호를 입력해 주세요.',
  RESTART_COMMAND: '> 다시 시작하시겠습니까? (y/n)',
};

const OUTPUT_MESSAGE = {
  WINNING_STASTICS_HEADER: '당첨 통계\n' + '--------------------',
};

const OUTPUT_MESSAGE_METHOD = {
  PURCHASE_QUANTITY: (quantity) => `${quantity}개를 구매했습니다.`,
  RANK: (rank, count) =>
    `${RANK[rank].matchCount}개 일치${rank === 'SECOND' ? ', 보너스 볼 일치' : ''} (${RANK[
      rank
    ].rewards.toLocaleString()}원) - ${count}개`,
  PROFIT_RATE: (rate) =>
    `총 수익률은 ${rate.toLocaleString(undefined, { minimumFractionDigits: 1 })}%입니다.`,
};

const ERROR_MESSAGE = {};

module.exports = { INPUT_MESSAGE, OUTPUT_MESSAGE, OUTPUT_MESSAGE_METHOD, ERROR_MESSAGE };
