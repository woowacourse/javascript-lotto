import LottoCountCalcultor from '../CalculatorImpl/LottoCountCalculator.js';
import RemainFareCalculator from '../CalculatorImpl/RemainFareCalculator.js';

describe('로또를 구매하고 남은 금액을 반환할 수 있어야 한다.', () => {
  test('1500원을 입력하면 500원이 반환돼야 한다.', () => {
    const fare = 1500;

    expect(new RemainFareCalculator(fare).execute()).toBe(500);
  });
});

describe('입력한 요금만큼 로또를 생성할 수 있다.', () => {
  test('5000원을 입력하면 5를 반환해야 한다.', () => {
    const fare = 5000;

    expect(new LottoCountCalcultor(fare).execute()).toBe(5);
  });
});
