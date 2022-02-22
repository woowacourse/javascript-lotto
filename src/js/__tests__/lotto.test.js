import Lotto from '../Lotto.js';

expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
});

test('구매한 각 로또 번호가 1 ~ 45 사이의 중복되지 않은 숫자인지 확인.', () => {
  const lotto = new Lotto();

  lotto.setLotto();
  const lottoList = lotto.getLotto();

  lottoList.forEach((lottoNumber) => {
    expect(lottoNumber).toBeWithinRange(1, 45);
  });
});
