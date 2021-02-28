export const LESS_THAN_TICKET_PRICE_MESSAGE =
  '1000원 미만의 금액은 입력할 수 없습니다. 1000원 이상의 금액을 입력해 주세요.';

export const DUPLICATE_WINNING_NUMBER =
  '중복된 숫자를 입력하셨습니다. 다시 입력해주세요.';

export const EXCEED_RANGE_NUMBER =
  '잘못된 숫자를 입력하셨습니다. 1~45 사이의 숫자를 입력해주세요.';

export const EXCEED_MONEY_AMOUNT = availableAmount => {
  return `구입 가능 금액을 초과했습니다. ${availableAmount}개 이내의 개수를 입력해주세요.`;
};
