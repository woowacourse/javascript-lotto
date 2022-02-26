import Lotto from '../models/Lotto';

it('로또 번호는 중복된 숫자들을 가질 수 없다.', () => {
  const duplicatedNumber = 1;
  const lotto = new Lotto();

  lotto.pushNumberIntoPickedNumber(duplicatedNumber);
  lotto.pushNumberIntoPickedNumber(duplicatedNumber);

  expect(lotto.pickedNumber).toHaveLength(1);
});

it('로또 번호는 숫자 6개를 초과할 수 없다.', () => {
  const testNumber = [1, 2, 3, 4, 5, 6, 7];
  const lotto = new Lotto();

  testNumber.forEach((v) => lotto.pushNumberIntoPickedNumber(v));
  expect(lotto.pickedNumber).toContain(1, 2, 3, 4, 5, 6);
});

it('로또 번호를 자동으로 생성할 시 숫자 6개를 가져야 한다.', () => {
  const lotto = new Lotto();
  lotto.generate();

  expect(lotto.pickedNumber.length).toBe(6);
});
