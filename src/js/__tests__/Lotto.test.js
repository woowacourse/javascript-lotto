import Lotto from '../model/Lotto.js';

it('로또번호는 중복될 수 없다.', () => {
  const duplicatedNumber = 1;
  const lotto = new Lotto();

  lotto.pushNumberIntoPickedNumber(duplicatedNumber);
  lotto.pushNumberIntoPickedNumber(duplicatedNumber);

  expect(lotto.pickedNumber).toContain(1);
});

it('로또번호는 6자리를 넘어갈 수 없다', () => {
  const testNumber = [1, 2, 3, 4, 5, 6, 7];
  const lotto = new Lotto();

  testNumber.forEach((v) => lotto.pushNumberIntoPickedNumber(v));
  expect(lotto.pickedNumber).toContain(1, 2, 3, 4, 5, 6);
});

it('로또번호는 6자리여야 한다.', () => {
  const lotto = new Lotto();
  lotto.generate();

  expect(lotto.pickedNumber.length).toBe(6);
});
