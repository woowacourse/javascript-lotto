import PurchaseAmountValidation from '../src/validation/purchaseAmount';
import RestartResponseValidation from '../src/validation/responseValidation';

describe('유효성 관련 함수 테스트', () => {
  test.each([['0'], ['999'], ['-1000'], ['1000.5']])('유효하지 않은 구입 금액 (%s) 이면 에러 반환합니다', (money) => {
    expect(() => PurchaseAmountValidation.validate(money)).toThrow('[ERROR]');
  });
  test.each(['yes', '1', 1, '!'])('유효하지 않은 재시작 응답 (%s)시 에러 반환합니다', (restartResponse) => {
    expect(() => RestartResponseValidation.validate(restartResponse)).toThrow('[ERROR]');
  });
});
