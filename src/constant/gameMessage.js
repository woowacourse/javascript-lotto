const PROMPT_PREFIX = '> ';
const LOTTO_PREFIX = '[';
const LOTTO_SUFFIX = ']';

const generatePromptMessage = (message) => `${PROMPT_PREFIX} ${message}`;

const GAME_MESSAGE = {
  PROMPT_PURCHASE_AMOUNT: generatePromptMessage('구입금액을 입력해 주세요.'),
  PROMPT_WINNING_NUMBERS: generatePromptMessage('당첨 번호를 입력해 주세요.'),
  PROMPT_BONUS_NUMBER: generatePromptMessage('보너스 번호를 입력해 주세요.'),
  PROMPT_RESTART_COMMAND: generatePromptMessage('다시 시작하시겠습니까? (y/n)'),
  PURCHASE_RESULT_TEXT: (lottoCount) => `${lottoCount}개를 구매했습니다.`,
  LOTTO_ITEM: (lotto) => {
    const lottoString = lotto.join(', ');
    return `${LOTTO_PREFIX}${lottoString}${LOTTO_SUFFIX}`;
  },
  LOTTO_WINNING_RESULT_TITLE: '당첨 통계\n--------------------',
  LOTTO_WINNING_RESULTS: (match, reward, count) => `${match} (${reward.toLocaleString()}원) - ${count}개`,
  LOTTO_PROFIT_RATE: (profitRate) => `총 수익률은 ${profitRate}%입니다.`,
};

export default GAME_MESSAGE;
