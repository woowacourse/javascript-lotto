import { SELECTOR } from '../../constants/selector.js';

export const makeLottosCountTemplate = (count) => `총 ${count}개를 구매하였습니다.`;
export const makeLottoTemplate = (numbers) => `
  <div class="${SELECTOR.CLASS.LOTTO_ITEM}"><span>🎟️</span> <span class="${SELECTOR.CLASS.LOTTO_ITEM_NUMBER}">${numbers}</span></div>
  `;
