import { RANKING } from './setting.js';

const PROMPT_PREFIX = '\n>';
const generatePromptMessage = (message) => `${PROMPT_PREFIX} ${message}`;

const GAME_MESSAGE = {
  PROMPT_PURCHASE_AMOUNT: generatePromptMessage('구입금액을 입력해 주세요. '),
  PROMPT_WINNING_NUMBERS: generatePromptMessage('당첨 번호를 입력해 주세요. '),
  PROMPT_BONUS_NUMBER: generatePromptMessage('보너스 번호를 입력해 주세요. '),
  PROMPT_RESTART_COMMAND: generatePromptMessage('다시 시작하시겠습니까? (y/n) '),
  LOTTO_WINNING_RESULT_TITLE: '\n당첨 통계\n--------------------',
  EXIT: '로또 게임을 종료합니다.',
};

export { GAME_MESSAGE };
