const NUMBER_LIST_LENGTH = 6;
const LOTTO_PRICE = 1000;
const MIN_NUMBER = 1;
const MAX_NUMBER = 45;

const MESSAGE = Object.freeze({
  SHOULD_EXCEED_MIN_COST: `금액은 ${LOTTO_PRICE}원 이상을 입력해주세요.`,
  ALREADY_PURCHASE_LOTTO:
    '이미 로또를 구매하셨습니다. 새로운 로또를 구매하려고 한다면 재시작 버튼을 클릭해주세요.',
  GET_SHOULD_NOT_HAVE_CHANGE_MESSAGE(cost) {
    return `남는 금액이 있습니다. ${cost % 1000}만큼의 돈을 빼주세요`;
  },
});

export { MESSAGE, NUMBER_LIST_LENGTH, MIN_NUMBER, MAX_NUMBER, LOTTO_PRICE };
