import { GAME_SYMBOL } from './symbols';

export const INPUT_INFO = {
  PURCHASE: `${GAME_SYMBOL.INPUT} 구입금액을 입력해 주세요. `,
  WINNING_NUMBER: `\n${GAME_SYMBOL.INPUT} 당첨 번호를 입력해 주세요. `,
  BONUS_NUMBER: `\n${GAME_SYMBOL.INPUT} 보너스 번호를 입력해 주세요. `,
  RESTART_OR_EXIT: `${GAME_SYMBOL.INPUT} 다시 시작하시겠습니까? (y/n) `,
};

export const OUTPUT_INFO = {
  displayPurchaseCount(purchaseCount) {
    return `${purchaseCount}개를 구매했습니다.`;
  },
  formatTicket(ticket) {
    return `[${ticket}]`;
  },
  WINNING_STATS: '\n당첨통계',
  WINNING_STATS_DIVIDIMG_LINE: '--------------------',
  describeWinning(prize, count) {
    if (prize === '5') return `3개 일치 (5,000원) ${GAME_SYMBOL.DASH} ${count}개`;
    if (prize === '4') return `4개 일치 (50,000원) ${GAME_SYMBOL.DASH} ${count}개`;
    if (prize === '3') return `5개 일치 (1,500,000원) - ${GAME_SYMBOL.DASH} ${count}개`;
    if (prize === '2')
      return `5개 일치, 보너스 볼 일치 (30,000,000원) ${GAME_SYMBOL.DASH} ${count}개`;
    if (prize === '1') return `6개 일치 (2,000,000,000원) ${GAME_SYMBOL.DASH} ${count}개`;
  },
  displayRateOfReturn(rateOfReturn) {
    return `총 수익률은 ${rateOfReturn}%입니다.\n`;
  },
};

export const PURCHASE_AMOUNT_INPUT_ERROR = {
  TYPE: `${GAME_SYMBOL.ERROR} 구매 금액은 숫자여야 합니다.`,
  UNIT: `${GAME_SYMBOL.ERROR}구매 금액은 1000원 단위여야 합니다.`,
  RANGE: `${GAME_SYMBOL.ERROR}최소 구매 금액은 1000원 입니다.`,
};

export const WINNING_NUMBER_INPUT_ERROR = {
  LENGTH: `${GAME_SYMBOL.ERROR} 로또 번호는 6개여야 합니다.`,
  TYPE: `${GAME_SYMBOL.ERROR} 로또 번호는 숫자여야 합니다.`,
  UNIQUE: `${GAME_SYMBOL.ERROR} 로또 번호는 중복되지 않아야 합니다.`,
  RANGE: `${GAME_SYMBOL.ERROR} 로또 번호의 숫자 범위는 1에서 45까지의 수입니다.`,
};

export const BONUS_NUMBER_INPUT_ERROR = {
  TYPE: `${GAME_SYMBOL.ERROR} 보너스 번호는 숫자여야 합니다.`,
  RANGE: `${GAME_SYMBOL.ERROR} 보너스 번호는 1 이상 45 이하여야 합니다.`,
  UNIQUE: `${GAME_SYMBOL.ERROR} 보너스 번호는 중복되지 않아야 합니다.`,
};

export const RESTART_OR_EXIT_INPUT_ERROR = {
  KEYWORD: `${GAME_SYMBOL.ERROR} y(재시작) 또는 n(종료)을 입력하여야 합니다.`,
};
