import { validationMoney } from "../src/validation";

describe('로또 구입 금액',() => {
  test('로또 구입 금액은 1,000원으로 나누어떨어져야 한다.',() => {
      const money = 1000;
      expect(() => {
          validationMoney(money);
      }).not.toThrow();
  })

  test('로또 구입 금액은 1,000원으로 나누어 떨어지지 않으면 에러를 발생한다.',() => {
    const money = 1001;
    expect(() => {
        validationMoney(money);
    }).toThrow();
  });
})