import { RANKING } from './setting.js';

const PROMPT_PREFIX = '\n>';
const generatePromptMessage = (message) => `${PROMPT_PREFIX} ${message}`;

const GAME_MESSAGE = {
  PROMPT_PURCHASE_AMOUNT: generatePromptMessage('구입금액을 입력해 주세요. '),
  PROMPT_WINNING_NUMBERS: generatePromptMessage('당첨 번호를 입력해 주세요. '),
  PROMPT_BONUS_NUMBER: generatePromptMessage('보너스 번호를 입력해 주세요. '),
  PROMPT_RESTART_COMMAND: generatePromptMessage('다시 시작하시겠습니까? (y/n) '),
  PURCHASE_RESULT_TEXT: (lottoCount) => `${lottoCount}개를 구매했습니다.`,
  LOTTO_ITEM: (lotto) => `[${lotto.join(', ')}]`,
  EXIT: '로또 게임을 종료합니다.',
};

const LOTTO_WINNING_RESULTS = {
  LOTTO_WINNING_RESULT_TITLE: '\n당첨 통계\n--------------------',
  WINNING_RESULT: (rank, winningCount) => {
    const matchingMessage = `${RANKING[rank].MATCHING_COUNT}개 일치${
      rank === RANKING.SECOND.NAME ? ', 보너스 볼 일치' : ''
    }`;
    const rewardMessage = `(${RANKING[rank].REWARD.toLocaleString()})원`;
    const winningCountMessage = `${winningCount}개`;
    return `${matchingMessage} ${rewardMessage} - ${winningCountMessage}`;
  },
  PROFIT_RATE: (profitRate) => `총 수익률은 ${profitRate}%입니다.`,
};

export { GAME_MESSAGE, LOTTO_WINNING_RESULTS };
