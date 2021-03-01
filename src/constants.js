export const LOTTO = Object.freeze({
  NUMBER_LIST_LENGTH: 6,
  CORRECT_NUMBER_LENGTH: 7,
  PRICE: 1000,
  MIN_NUMBER: 1,
  MAX_NUMBER: 45,
});

export const GAME = Object.freeze({
  INITIAL_DEPOSIT: 0,
});

export const MESSAGE = Object.freeze({
  SHOULD_MORE_THAN_ZERO: '추가할 금액은 0 이상이어야 합니다.',
  SHOULD_BE_INTERGER: '추가할 금액은 0 이상의 정수여야 합니다',
  NOT_ENOUGH_MONEY: '로또를 구매할 돈이 부족합니다. 돈을 더 입금해주세요',
  SHOULD_INPUT_ALL_NUMBERS:
    '모든 번호를 입력해주셔야 결과를 확인할 수 있습니다.',
  DUPLICATED_NUMBER_EXIST: '번호들 중 중복된 숫자가 존재합니다.',
  NUMBER_RANGE_EXCEEDED: `${LOTTO.MIN_NUMBER} ~ ${LOTTO.MAX_NUMBER} 사이의 숫자들만 번호로 입력해주세요`,
  getChangeExistGuideMessage: (changeMoney) => {
    if (changeMoney > LOTTO.PRICE) {
      return `현재 잔돈이 ${changeMoney}원 만큼 남아있습니다. 남은 돈으로 자동 구매를 수행할까요? 자동 구매 후에도 ${
        changeMoney % LOTTO.PRICE
      }원 만큼의 금액이 남습니다.`;
    }

    return `현재 잔돈이 ${changeMoney}원 만큼 남아있습니다. 남은 돈을 모두 쓰고 싶으시면 ${LOTTO.PRICE}원 단위로 금액을 맞춰주세요`;
  },
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

export const BONUS_ITEM_MATCH_COUNT = REWARDS.find(
  (reward) => reward.shouldCheckBonus
).matchCount;

export const VALIDATION = Object.freeze({
  NO_ERROR_MESSAGE: '',
});

export const SELECTOR = Object.freeze({
  DEPOSIT: '#deposit',
  DEPOSIT_INPUT: '#deposit__input',
  DEPOSIT_BUTTON: '#deposit__button',
  DEPOSIT_PRESENTER: '#deposit-presenter',
  PURCHASE: '#purchase',
  PURCHASE_BUTTON: '#purchase__button',
  PURCHASE_INPUT: '.purchase__input',
  PURCHASE_INPUT_WRAPPER: '#purchase__input-wrapper',
  AUTO_PURCHASE_BUTTON: '#auto-purchase__button',
  RESULT: '#result',
  RESULT_TEXT: '#result__text',
  RESULT_ITEM_COUNT: '#result__item-count',
  RESULT_ITEM_LIST: '#result__item-list',
  RESULT_NUMBERS_TOGGLE: '#result__numbers-toggle',
  LOTTO_NUMBERS: '.lotto-numbers',
  LOTTO_ITEM: '.lotto-item',
  CORRECT_NUMBER: '#correct-number',
  CORRECT_NUMBER_INPUT_WRAPPER: '#correct-number__input-wrapper',
  CORRECT_NUMBER_INPUT: '.correct-number__input',
  CORRECT_NUMBER_INPUT_BONUS: '.correct-number__input--bonus',
  MODAL: '#modal',
  MODAL_OPEN_BUTTON: '#modal__open-button',
  MODAL_CLOSE_BUTTON: '#modal__close-button',
  RESTART_BUTTON: '#modal__restart-button',
  MODAL_TBODY: '#modal__tbody',
  PROFIT_RATE: '#profit-rate',
});

export const CSS_CLASS = Object.freeze({
  VISIBLE: 'visible',
  INVISIBLE: 'invisible',
  ADDED: 'd-block',
  REMOVED: 'd-none',
  OPEN: 'open',
  FLEX_DIRECTION_COLUMN: 'flex-col',
  LOTTO_NUMBERS_ADDED: 'result__item-list--numbers-added',
  LOTTO_NUMBERS_REMOVED: 'result__item-list--numbers-removed',
});
