import validation from '../src/validation/validation';

describe('로또 구입 금액 유효성 검사', () => {
  test.each([['0'], ['999'], ['-1000'], ['1000.5']])(
    '유효하지 않은 구입 금액이면 에러 반환',
    (money) => {
      expect(() => validation.purchaseAmount(money)).toThrow('[ERROR]');
    }
  );
});
