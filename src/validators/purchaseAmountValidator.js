import numberValidator from './numberValidator';

const purchaseAmountValidator = {
  validate(purchaseAmount) {
    numberValidator.validate(purchaseAmount);
    this.validateUnitAmount(purchaseAmount);
  },

  validateUnitAmount(purchaseAmount) {
    if (purchaseAmount % 1000 !== 0) {
      throw new Error('[ERROR] 로또 구매 금액은 1000원 단위로 입력해주세요.');
    }
  },
};

export default purchaseAmountValidator;
