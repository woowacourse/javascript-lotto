export const LOTTO_PRICE = 1000;
export const ERROR_MESSAGE = {
  PURCHASE_AMOUNT_IS_TOO_LOW: `입력된 금액이 로또 한 장의 가격보다 작습니다. ${LOTTO_PRICE}원 이상의 금액을 입력해주세요`,
  PURCHASE_AMOUNT_HAS_CHANGE: (change) =>
    `입력된 금액에서 ${change}원을 제외한 금액으로 로또를 구매했습니다. 거스름돈 챙겨가세요.`,
};
