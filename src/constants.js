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
  DUPLICATED_NUMBER_EXIST_MESSAGE: '당첨번호들 중 중복된 숫자가 존재합니다.',
  NUMBER_RANGE_EXCEEDED_MESSAGE: `${LOTTO.MIN_NUMBER} ~ ${LOTTO.MAX_NUMBER} 사이의 숫자들만 당첨번호로 입력해주세요`,
  SHOULD_INPUT_ALL_NUMBERS_MESSAGE:
    '모든 당첨번호를 입력해주셔야 결과를 확인할 수 있습니다.',
});

export const REWARDS = Object.freeze([
  {
    matchCount: 3,
    shouldCheckBonus: false,
    money: 5000,
  },
  {
    matchCount: 4,
    shouldCheckBonus: false,
    money: 50000,
  },
  {
    matchCount: 5,
    shouldCheckBonus: false,
    money: 1500000,
  },
  {
    matchCount: 5,
    shouldCheckBonus: true,
    money: 30000000,
  },
  {
    matchCount: 6,
    shouldCheckBonus: false,
    money: 2000000000,
  },
]);

export const BONUS_ITEM_MATCH_COUNT = REWARDS
  .find(reward => reward.shouldCheckBonus)
  .matchCount

export const VALID_CHECK_RESULT = '';

export const SELECTOR = Object.freeze({
  COST_SUBMIT_FORM: '#cost-submit-form',
  COST_INPUT: '#cost-input',
  COST_SUBMIT_BUTTON: '#cost-submit-button',
  PURCHASE_RESULT: '#purchase-result',
  PURCHASE_ITEM_COUNT: '#purchase-item-count',
  LOTTO_NUMBERS_TOGGLE_BUTTON: '#lotto-numbers-toggle-button',
  PURCHASE_ITEM_LIST: '#purchase-item-list',
  CORRECT_NUMBER_WRAPPER: '#correct-number-wrapper',
  RESULT_MODAL_OPEN_BUTTON: '#result-modal-open-button',
  MODAL_CLOSE: '#modal-close',
  MODAL: '#modal',
  RESULT_TBODY: '#result-tbody',
  PROFIT_RATE: '#profit-rate',
  RESTART_BUTTON: '#restart-button',
  WINNING_NUMBER_INPUT_FORM: '#winning-number-input-form'
})