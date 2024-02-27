import Money from '../src/Domain/Money.js';

describe('돈을 담당하는 클래스에 관한 테스트 코드 작성', () => {
  test.each([[1000], [8300]])('1000원 이상이 되는 금액을 투입 했을때, 1000으로 나눈 몫을 저장한다', (validInput) => {
    const money = new Money();

    money.fromInputValue(validInput);

    expect(money.getMoney()).toBe(validInput);
  });

  test('1000원 미만의 금액을 투입하면 예외 처리 한다.', () => {
    const invalidInput = 999;

    const money = new Money();

    expect(() => money.fromInputValue(invalidInput)).toThrow();
  });
});
