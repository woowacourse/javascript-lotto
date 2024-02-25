import Money from '../../src/domain/Money';
describe('Money 테스트', () => {
  test.each([-1, 0, 'd'])('로또 구입 금액에 양의 정수가 아닌 %s을 입력하면, 에러가 발생한다.', input => {
    expect(() => {
      new Money(input);
    }).toThrow();
  });

  test.each([1001, 300, 10001])('로또 구입 금액에 1000단위가 아닌 %s을 입력하면, 에러가 발생한다.', input => {
    expect(() => {
      new Money(input);
    }).toThrow();
  });
});
