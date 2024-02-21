/* eslint-disable max-lines-per-function */
import { ERROR_MESSAGE, VARIABLE_ALIAS } from '../src/constant/Messages.js';
import OPTIONS from '../src/constant/Options.js';
import LottoMachine from '../src/domain/LottoMachine';

describe('구입 금액에 따른 구입 가능 수량 계산 테스트', () => {
  let lottoMachine;

  beforeEach(() => {
    lottoMachine = new LottoMachine();
  });

  test.each(['a', 1.1])(
    '구입 금액이 정수가 아니라면 에러를 발생시킨다',
    (purchaseAmount) => {
      expect(() => lottoMachine.calculateIssueQuantity(purchaseAmount)).toThrow(
        `${ERROR_MESSAGE.prefix}${ERROR_MESSAGE.isNotInteger(VARIABLE_ALIAS.purchaseAmount)}`
      );
    }
  );

  test('구입 금액이 1000 미만이라면 에러를 발생시킨다.', () => {
    const purchaseAmount = 999;

    expect(() => lottoMachine.calculateIssueQuantity(purchaseAmount)).toThrow(
      `${ERROR_MESSAGE.prefix}${ERROR_MESSAGE.isNotAtLeast(VARIABLE_ALIAS.purchaseAmount, OPTIONS.LOTTO.price)}`
    );
  });

  test.each([
    [1000, 1],
    [1999, 1],
    [2000, 2]
  ])(
    '구입 금액에 따른 발행 수량을 계산하여 반환한다.',
    (purchaseAmount, quantity) => {
      expect(lottoMachine.calculateIssueQuantity(purchaseAmount)).toBe(
        quantity
      );
    }
  );
});
