import checkLottoPurchase from '../src/Validation/checkLottoPurchase.js';
import ERROR_MESSAGE from '../src/constants/ErrorMessage.js';

describe('로또 구입 금액 유효성 테스트', () => {
  describe('로또 구입 최소 금액 테스트', () => {
    it('로또 구입 최소 금액은 1000원 미만일때 에러를 던진다.', () => {
      const testCase = 999;
      expect(() => {
        checkLottoPurchase(testCase);
      }).toThrow(ERROR_MESSAGE.notEnoughMoney);
    });
    it('로또 구입 최소 금액이 1000원 이상일때 에러를 던지지 않는다.', () => {
      const testCase = 1000;
      expect(() => {
        checkLottoPurchase(testCase);
      }).not.toThrow();
    });

    describe('로또 구입 금액 1000원 단위인지 확인하는 테스트', () => {
      it('로또 구입 금액은 1000원 단위가 아닐때 에러를 던진다.', () => {
        const testCase = 1001;
        expect(() => {
          checkLottoPurchase(testCase);
        }).toThrow(ERROR_MESSAGE.notANote);
      });

      it('로또 구입 금액은 1000원 단위일 때 에러를 던지지 않는다.', () => {
        const testCase = 2000;
        expect(() => {
          checkLottoPurchase(testCase);
        }).not.toThrow();
      });
    });
  });
});
