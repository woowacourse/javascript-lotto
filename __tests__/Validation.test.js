import Validation from '../src/domain/Vaildation.js';

test.each(['abc', '8천원', '8$'])(
  '구입금액 입력이 숫자가 아닌 경우 false를 반환한다.',
  (purchaseAmount) => {
    const result = Validation.isNumber(purchaseAmount);

    expect(result).toBe(false);
  }
);

test('구입금액 입력이 숫자인 경우 true를 반환한다.', () => {
  const purchaseAmount = '1000';

  const result = Validation.isNumber(purchaseAmount);

  expect(result).toBe(true);
});
