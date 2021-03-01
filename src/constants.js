import { deepFreeze } from './utils/freeze.js';

export const LOTTO = Object.freeze({
  NUMBER_LIST_LENGTH: 6,
  CORRECT_NUMBER_LENGTH: 7,
  PRICE: 1000,
  MIN_NUMBER: 1,
  MAX_NUMBER: 45,
});

export const MESSAGE = Object.freeze({
  SHOULD_EXCEED_MIN_COST: `금액은 ${LOTTO.PRICE}원 이상을 입력해주세요.`,
  ALREADY_PURCHASE_LOTTO:
    '이미 로또를 구매하셨습니다. 새로운 로또를 구매하려고 한다면 재시작 버튼을 클릭해주세요.',
  GET_SHOULD_NOT_HAVE_CHANGE_MESSAGE(cost) {
    return `남는 금액이 있습니다. ${cost % 1000}만큼의 돈을 빼주세요`;
  },
  SHOULD_HAVE_PURCHASE_COUNT: '1개 이상으로 구매해주세요.',
  GET_SHOULD_FILL_LESS_THAN_REMAIN_COUNT_MESSAGE(remainCount) {
    return `${remainCount}개 이하로만 구매할 수 있습니다.`;
  },
  DUPLICATED_NUMBER_EXIST: '입력된 번호 중 중복된 번호가 존재합니다.',
  NUMBER_RANGE_EXCEEDED: `${LOTTO.MIN_NUMBER} ~ ${LOTTO.MAX_NUMBER} 사이의 숫자만 입력할 수 있습니다.`,
  SHOULD_FILL_ALL_LOTTO_NUMBERS:
    '모든 로또번호를 입력해주셔야 로또를 구매할 수 있습니다.',
  SHOULD_FILL_ALL_WINNING_NUMBERS:
    '모든 당첨번호를 입력해주셔야 결과를 확인할 수 있습니다.',
});

export const REWARDS = deepFreeze([
  {
    matchCount: 3,
    isBonusMatched: false,
    money: 5000,
  },
  {
    matchCount: 4,
    isBonusMatched: false,
    money: 50000,
  },
  {
    matchCount: 5,
    isBonusMatched: false,
    money: 1500000,
  },
  {
    matchCount: 5,
    isBonusMatched: true,
    money: 30000000,
  },
  {
    matchCount: 6,
    isBonusMatched: false,
    money: 2000000000,
  },
]);

export const CHECK_SECOND_CONDITION_NUMBER = REWARDS.find(
  (reward) => reward.isBonusMatched,
).matchCount;

export const SELECTOR = Object.freeze({
  COST_SUBMIT_FORM: '#cost-submit-form',
  COST_INPUT: '#cost-input',
  CHOICE_PURCHASE_METHOD: '#choice-purchase-method',
  AUTO_PURCHASE_BUTTON: '#auto-purchase-button',
  MANUAL_PURCHASE_BUTTON: '#manual-purchase-button',
  REMAIN_LOTTO_COUNT_TEXT: '#remain-lotto-count-text',
  REMAIN_COUNT: '#remain-count',
  AUTO_COUNT_FORM: '#auto-count-form',
  AUTO_COUNT_INPUT: '#auto-count-input',
  MANUAL_LOTTO_NUMBERS_FORM: '#manual-lotto-numbers-form',
  MANUAL_LOTTO_NUMBERS_WRAPPER: '#manual-lotto-numbers-wrapper',
  PURCHASE_RESULT: '#purchase-result',
  PURCHASE_ITEM_COUNT: '#purchase-item-count',
  LOTTO_NUMBERS_TOGGLE_BUTTON: '#lotto-numbers-toggle-button',
  PURCHASE_ITEM_LIST: '#purchase-item-list',
  CORRECT_NUMBER_WRAPPER: '#correct-number-wrapper',
  MODAL_CLOSE: '#modal-close',
  MODAL: '#modal',
  RESULT_TBODY: '#result-tbody',
  PROFIT_RATE: '#profit-rate',
  RESTART_BUTTON: '#restart-button',
  CORRECT_NUMBER_INPUT_FORM: '#correct-number-input-form',
  LOTTO_NUMBER: '.lotto-number',
  CORRECT_NUMBER: '.correct-number',
});
